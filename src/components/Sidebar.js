import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaStickyNote,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUserAlt />,
    },
    {
      path: "/categories",
      name: "Category",
      icon: <FaClipboardList />,
    },

    {
      path: "/notes",
      name: "Notes",
      icon: <FaStickyNote />,
    },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    console.log("abc");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="d-flex flex-row">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            NMA
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </Link>
        ))}
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          {/* logout */}
          <div
            onClick={handleLogout}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            <FaSignOutAlt />
          </div>
          <button
            style={{ display: isOpen ? "block" : "none" }}
            onClick={handleLogout}
            className="link_text btn text-white "
          >
            Logout
          </button>
        </div>
      </div>
      <main className="flex">{children}</main>
    </div>
  );
};

export default Sidebar;
