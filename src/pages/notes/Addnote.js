import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNote = (props) => {
  let navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([{ name: "", id: "" }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/categories/all`);
      const newData = await response.json();
      setCategoryList(newData);
    };
    fetchData();
  }, []);

  const [note, setNote] = useState({
    title: "",
    categoryId: 0,
    content: "",
  });

  const { title, content } = note;

  const onInputChange = (e) => {
    if (e.target.name === "category") {
      // Handle category selection
      setSelectedCategoryId(e.target.value);
      setNote({ ...note, categoryId: parseInt(e.target.value, 10) || 0 });
    } else {
      setNote({ ...note, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: note.title,
      content: note.content,
      category: { id: note.categoryId },
    };

    await axios.post("http://localhost:8080/api/notes/add", payload);
    navigate("/notes");
    Swal.fire("", "Note Added Successfully..", "success");
  };

  return (
    <div className="container my-3">
      <div className="d-flex flex-row justify-content-center align-items-center p-3 ">
        <div className="col-6 ">
          <img
            className="h-100"
            src={require("../../Images/svg4.svg").default}
            alt="svg"
          />
        </div>

        <div className="col-1 d-flex h-75"></div>
        <div className="col-4 row d-flex justify-content-center align-items-center ">
          <div className="container my-3 card border border-2 border-primary p-4">
            <h2 className="text-center card-heading">Add a Note</h2>

            <form
              className="  justify-content-around"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="mt-2 mb-3  ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                  minLength={5}
                  required
                />
              </div>
              <div className=" mb-3 ">
                <select
                  name="category"
                  value={selectedCategoryId}
                  onChange={(e) => onInputChange(e)}
                  className="form-control"
                >
                  <option value="">Choose Category</option>
                  {categoryList.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  id="content"
                  placeholder="Enter content"
                  name="content"
                  value={content}
                  onChange={(e) => onInputChange(e)}
                  minLength={5}
                  required
                  rows="5"
                ></textarea>
              </div>

              <div className="mt-4 d-flex justify-content-center align-items-center">
                <button
                  disabled={title.length < 5 || content.length < 5}
                  type="submit"
                  className="btn btn-primary w-75"
                >
                  Add Note
                </button>
                <Link
                  to="/notes"
                  type="submit"
                  className="btn btn-outline-danger ms-2  w-25"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-1 d-flex h-100"></div>
      </div>
    </div>
  );
};

export default AddNote;
