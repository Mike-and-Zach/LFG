import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { callApi } from "../api/utils";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import Inbox from "./Inbox";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="app-container">
      <Navbar setToken={setToken} />
      <Routes>
        <Route
          path="/posts"
          element={<Posts token={token} selectedGame={selectedGame} />}
        ></Route>

        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/inbox" element={<Inbox token={token} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
