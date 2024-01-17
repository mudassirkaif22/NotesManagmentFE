import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddEditUser from "./AddEditUser";
import DeleteUser from "./DeleteUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showAddEditUserModal, setShowAddEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // get all users
    axios.get("http://localhost:8080/auth/user/getAllUsers")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setShowAddEditUserModal(true);
  };

  const handleAdd = () => {
    setSelectedUserId(null);
    setShowAddEditUserModal(true);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeleteUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddEditUserModal(false);
    setShowDeleteUserModal(false);
  };
const Role =localStorage.getItem("role")
  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="d-flex row">
          <div className="d-flex justify-content-center">
            <h1 className="text-primary fw-bold">User Information</h1>
          </div>
          {
             Role === "ROLE_ADMIN" ? <div className="d-flex justify-content-end mb-3 mt-3 mr-3 ">
             <Button variant="primary" onClick={handleAdd}>
               Create User
             </Button>
           </div> : null
          }
          
        </div>

        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered ">
              <thead>
                <tr>
                  <th>UserId</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                 {
                  Role === "ROLE_ADMIN" ? <th>Actions</th> :null 
                 } 
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roles}</td>
                    {
                      Role === "ROLE_ADMIN" ? <td>
                      <button onClick={() => handleEdit(user.id)} className="btn btn-primary m-1">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="btn btn-danger ">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td> : null
                    }
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddEditUser
          show={showAddEditUserModal}
          handleClose={handleCloseModal}
          handleAction={handleEdit}
          selectedUserId={selectedUserId}
        />

        <DeleteUser
          show={showDeleteUserModal}
          handleClose={handleCloseModal}
          handleDelete={handleDelete}
          selectedUserId={selectedUserId}
        />
      </div>
    </div>
  );
}
