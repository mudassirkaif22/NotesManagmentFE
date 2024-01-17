import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewNote = (props) => {
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    category: "",
    content: "",
  });

  const { title, content } = note;

  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/notes/${id}`);
      setNote({
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
      });
      console.log("category", content);
    } catch (error) {
      console.error("Error loading note:", error);
    }
  };

  return (
    <div className="container my-3">
      <div className="d-flex flex-row justify-content-center align-items-center  p-3 ">
        <div className="col-6 ">
          <img
            className="h-100"
            src={require("../../Images/svg4.svg").default}
            alt="Notes"
          />
        </div>

        <div className="col-1 d-flex  h-75"></div>
        <div className="col-4 row d-flex justify-content-center align-items-center ">
          <div className="container my-3 card border border-2 border-primary p-4">
            <form className="  justify-content-around">
              <div className="mt-2 mb-3  ">
                <label>Title</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                  minLength={5}
                  required
                />
              </div>
              {/* <div className=" mb-3 ">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  id="category"
                  name="category"
                  value={note.category ? note.category.name : ''}
                  onChange={(e) => onInputChange(e)}
                  minLength={5}
                  required
                />
              </div> */}

              <div className="mb-3">
                <label>Content</label>
                <textarea
                  type="text"
                  className="form-control"
                  disabled
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => onInputChange(e)}
                  minLength={5}
                  required
                  rows="5"
                >
                  {" "}
                </textarea>
              </div>

              <div className="mt-4 d-flex justify-content-center align-items-center">
                <Link
                  to="/notes"
                  type="submit"
                  className="btn btn-outline-danger  w-100"
                >
                  Back
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

export default ViewNote;
