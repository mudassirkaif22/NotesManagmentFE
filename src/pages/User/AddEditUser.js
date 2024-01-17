import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const AddEditUser = ({ show, handleClose, handleAction, selectedUserId }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    roles: "",
    password: "",
  });

  useEffect(() => {
    // get user data
    if (selectedUserId) {
      axios
        .get(`http://localhost:8080/auth/user/${selectedUserId}`)
        .then((response) => {
          const user = response.data;
          setUserData({
            name: user.name,
            email: user.email,
            roles: user.roles,
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user by ID:", error);
        });
    }
  }, [selectedUserId]);

  const handleUserAction = () => {
    if (selectedUserId) {
      // Update user by ID
      axios
        .put(`http://localhost:8080/auth/user/${selectedUserId}`, userData)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          handleClose();
          // Show SweetAlert on success
          Swal.fire({
            icon: "success",
            title: "User Updated",
            text: "User information has been updated successfully!",
          });
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      // Add a new user
      axios
        .post("http://localhost:8080/auth/addNewUser", userData)
        .then((response) => {
          console.log("User added successfully:", response.data);
          handleClose();
          // Show SweetAlert on success
          Swal.fire({
            icon: "success",
            title: "User Added",
            text: "New user has been added successfully!",
          });
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedUserId ? "Edit User" : "Add New User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Roles</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter roles"
              value={userData.roles}
              onChange={(e) =>
                setUserData({ ...userData, roles: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUserAction}>
          {selectedUserId ? "Update User" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditUser;
