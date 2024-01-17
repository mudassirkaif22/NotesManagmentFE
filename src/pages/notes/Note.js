import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export const Note = (props) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const result = await axios.get("http://localhost:8080/api/notes/all");
    setNotes(result.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}`);
    Swal.fire("", "Note Deleted Successfully..", "success");
    loadNotes();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFilterButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((note) => {
      if (startDate && endDate) {
        const noteDate = new Date(note.dateTime).toISOString().split("T")[0];
        return (
          noteDate >= startDate.toISOString().split("T")[0] &&
          noteDate <= endDate.toISOString().split("T")[0]
        );
      }
      return true;
    });

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-primary fw-bold mb-4">Your Notes</h1>

        <div className="row">
          <div className="col-md-4">
            {/* search bar */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search by title"
                className="form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="col-md-8 d-flex justify-content-end">
            {/* filter button */}
            <div className="mb-3">
              <button
                className="btn btn-secondary me-2"
                onClick={handleFilterButtonClick}
              >
                <i className="bi bi-filter"></i> Filter
              </button>
              {/* filter the notes as per date */}
              {showDatePicker && (
                <>
                  <label className="me-2 ms-2">Start Date:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                  />
                  <label className="me-2 ms-2">End Date:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="row my-3">
          {/* Add New Note Card */}
          <div className="col-md-4 d-flex justify-content-around">
            <div className="card my-3 border border-1 border-primary p-5 w-100 bg-light">
              <p className="d-flex justify-content-around m-1 fw-bold">
                Add New Note
              </p>
              <div className="d-flex justify-content-around ">
                <Link
                  to="/addnotes"
                  type="submit"
                  className="btn btn-primary btn-rounded px-3"
                >
                  <i className="bi bi-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Display Filtered Notes */}
          {filteredNotes
            .slice(0)
            .reverse()
            .map((note) => (
              <div className="col-md-4" key={note.id}>
                <div className="card my-3 border border-2 border-primary">
                  <div className="card-body">
                    <h5 className="card-text text-start">
                      <span className="me-2 fw-bold align-middle">
                        {note.title}
                      </span>
                      -
                      <span
                        className="badge badge-secondary ms-2"
                        style={{ color: "black" }}
                      >
                        {note.dateTime}
                      </span>
                    </h5>
                    <p className="card-text">{note.content}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-around ">
                    <Link
                      to={`/editnotes/${note.id}`}
                      type="submit"
                      className="btn btn-outline-primary col-6"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/viewnotes/${note.id}`}
                      type="submit"
                      className="btn btn-primary col-2  "
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-danger col-2 "
                      onClick={() => deleteNote(note.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
