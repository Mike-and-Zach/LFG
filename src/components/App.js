import { useState, useEffect } from "react";;
import { Route, Routes, Link} from "react-router-dom"
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";

const App = () => {
    const [token, setToken] = useState("");
    console.log(token);
    return (
    <div>
       <Link to="/login">Login</Link>
       <Link to="/register">Register</Link>
       <Link to="/posts">Posts</Link>
       <Routes>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/register" element={<Register token={token} setToken={setToken}/>}></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
       </Routes>
    </div>
    )
}


export default App;