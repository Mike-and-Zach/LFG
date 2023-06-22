import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import Inbox from "./Inbox";
import swal from "sweetalert";
import Navbar from "./Navbar";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [gameTitle, setGameTitle] = useState("");


  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="app-container">
      <Navbar setToken={setToken} gameTitle={gameTitle} setGameTitle={setGameTitle} token={token}/>
      <Routes>
        <Route
          path="/posts"
          element={<Posts token={token} gameTitle={gameTitle} setGameTitle={setGameTitle}/>}
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
