import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const AddEditCategories = ({
  show,
  handleClose,
  handleEdit,
  selectedCategoryId,
}) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  useEffect(() => {
    // get category data
    if (selectedCategoryId) {
      axios
        .get(`http://localhost:8080/api/categories/${selectedCategoryId}`)
        .then((response) => {
          const category = response.data;
          setCategoryData({
            name: category.name,
          });
        })
        .catch((error) => {
          console.error("Error fetching category by ID:", error);
        });
    }
  }, [selectedCategoryId]);

  const handleCategoryAction = () => {
    if (selectedCategoryId) {
      // Update category by ID
      axios
        .put(
          `http://localhost:8080/api/categories/${selectedCategoryId}`,
          categoryData
        )
        .then((response) => {
          console.log("Category updated successfully:", response.data);
          handleClose();
          // Show SweetAlert on success
          Swal.fire({
            icon: "success",
            title: "Category Updated",
            text: "Category information has been updated successfully!",
          });
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    } else {
      // Add a new category
      axios
        .post("http://localhost:8080/api/categories", categoryData)
        .then((response) => {
          // console.log("Category added successfully:", response.data);
          handleClose();

          // Show SweetAlert on success
          Swal.fire({
            icon: "success",
            title: "Category Added",
            text: "New category has been added successfully!",
          });
          // window.location.reload();
        })
        .catch((error) => {
          alert("Category Already exist");
          console.error("Error adding category:", error);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedCategoryId ? "Edit Category" : "Add New Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCategoryAction}>
          {selectedCategoryId ? "Update Category" : "Add Category"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditCategories;
