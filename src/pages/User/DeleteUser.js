import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const DeleteUser = ({ show, handleClose, handleDelete, selectedUserId }) => {
  const handleUserDelete = () => {
    // Delete user by ID
    axios
      .delete(`http://localhost:8080/auth/user/${selectedUserId}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        handleClose();
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "User Deleted",
          text: "User has been deleted successfully!",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this user?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleUserDelete}>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUser;
