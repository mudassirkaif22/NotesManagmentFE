import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DeleteCategory from "./DeleteCategory";
import AddEditCategories from "./AddEditCategories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAddEditCategory, setShowAddEditCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    // get all categories
    axios.get("http://localhost:8080/api/categories/all")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleEdit = (id) => {
    setSelectedCategoryId(id);
    setShowAddEditCategory(true);
  };

  const handleAdd = () => {
    setSelectedCategoryId(null);
    setShowAddEditCategory(true);
  };

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteCategory(true);
  };

  const handleClose = () => {
    setShowAddEditCategory(false);
    setShowDeleteCategory(false);
  };

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="d-flex row">
          <div className="d-flex justify-content-center">
            <h1 className="text-primary fw-bold">Category Information</h1>
          </div>
          <div className="d-flex justify-content-end mb-3 mt-3 mr-3">
            <Button variant="primary" onClick={handleAdd}>
              Create Category
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                    <th>Sr.No.</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>
                        {index+1}
                    </td>
                    <td>{category.name}</td>
                    <td>
                      <button onClick={() => handleEdit(category.id)} className="btn btn-primary m-1">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddEditCategories
          show={showAddEditCategory}
          handleClose={handleClose}
          handleEdit={handleEdit}
          selectedCategoryId={selectedCategoryId}
        />

        <DeleteCategory
          show={showDeleteCategory}
          handleClose={handleClose}
          handleDelete={handleDelete}
          selectedCategoryId={selectedCategoryId}
        />
      </div>
    </div>
  );
}
