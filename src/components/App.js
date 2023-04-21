import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { callApi } from "../api/utils";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import Inbox from "./Inbox";
import { useNavigate } from "react-router-dom";

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
      <Navbar setToken={setToken} token={token}/>
      <div className="whole">
        <Sidebar setSelectedGame={setSelectedGame} selectedGame={selectedGame}/>
        <Posts token={token} selectedGame={selectedGame}/>
       </div>
    </div>
  );
};

export default App;
