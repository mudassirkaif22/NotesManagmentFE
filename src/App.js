import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Categories from "./pages/categories/Categories";
import AddNote from "./pages/notes/Addnote";
import EditNote from "./pages/notes/Editnote";
import ViewNote from "./pages/notes/Viewnote";
import { Note } from "./pages/notes/Note";
import Dashboard from "./components/Dashboard";
import Users from "./pages/User/Users";

const token = localStorage.getItem("accessToken");
function App() {
  return (
    <>
      <BrowserRouter>
        {token ? (
          <Sidebar>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notes" element={<Note />} />
              <Route path="/users" element={<Users />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/addnotes" element={<AddNote />} />
              <Route path="/editnotes/:id" element={<EditNote />} />
              <Route path="/viewnotes/:id" element={<ViewNote />} />
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
       
      </BrowserRouter>
    </>
  );
}

export default App;
