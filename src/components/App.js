import { useState, useEffect } from "react";;
import { Route, Routes, Link} from "react-router-dom"
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    console.log("token ==>", token);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("token", token)
    }, [])

    

    return (
    <div>
        <Link to="/posts">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
         <Link to="/login" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            navigate("/login")
            swal({
                text: "Thank you for visiting!"
            })
            // window.location.reload(false)
       }}>Logout</Link>
        
       <Routes>
        <Route path="/posts" element={<Posts token={token}/>}></Route>
        <Route path="/register" element={<Register token={token} setToken={setToken} />}></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
       </Routes>
    </div>
    )
}


export default App;