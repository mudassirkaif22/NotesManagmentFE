import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Login API
      const result = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });
      if (result.status === 200) {
        navigate("/dashboard");
        localStorage.setItem("accessToken", result.data.token);
        localStorage.setItem("role", result.data.role);
        console.log(result.data.role);
        window.location.reload();
      }
    } catch {
      alert("Invalid Creadencial");
      // console.log("error");
    }
  };
  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4 ">Login </h3>
                    <p className="text-muted mb-4"></p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <input
                          id="Username"
                          type="Username"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          autofocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Sign in
                      </button>
                      <div className="text-center d-flex justify-content-between mt-4"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
