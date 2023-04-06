import { useState, useEffect } from "react";;
import { Route, Routes, Link} from "react-router-dom"
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";

const App = () => {
    return (
    <div>
       <Link to="/login">Login</Link>
       <Link to="/register">Register</Link>
       <Link to="/posts">Posts</Link>
       <Routes>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
       </Routes>
    </div>
    )
}


export default App;