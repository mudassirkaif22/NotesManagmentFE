import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const DeleteCategory = ({ show, handleClose, selectedCategoryId }) => {
  const handleCategoryDelete = () => {
    // Delete category by ID
    axios
      .delete(`http://localhost:8080/api/categories/${selectedCategoryId}`)
      .then((response) => {
        console.log("Category deleted successfully:", response.data);
        handleClose();
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Category Deleted",
          text: "Category has been deleted successfully!",
        });
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this category?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCategoryDelete}>
          Delete Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategory;
