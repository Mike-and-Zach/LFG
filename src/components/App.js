import { useState, useEffect } from "react";;
import { Route, Routes, Link} from "react-router-dom"
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import Inbox from "./Inbox";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    console.log("token ==>", token);
    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("token", token)
    }, [token])

    

    return (
    <div className="app-container">
        <div className="navbar-container">
            <div className="navbar-group1">
                <img src="/img/lfg-logo.jpeg"/>
                <h2 className="header">ImLFG</h2>
            </div>
                <div className="link-container">
                    <ul className="navbar">
                        <li className="navbar-links"><Link to="/posts" className="single-links">Home</Link></li>    
                        {username && <li className="navbar-links"><Link to="/inbox" className="single-links">Inbox</Link></li>}
                        {!username && <li className="navbar-links"><Link to="/login" className="single-links">Login</Link></li>}
                        {!username && <li className="navbar-links"><Link to="/register" className="register-btn">Register</Link></li>}
                        {username && <li className="navbar-links"><Link to="/login" className="logout-btn" onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("userId");
                    navigate("/login")
                    swal({
                        text: "Thank you for visiting!"
                    })
                    }}>Logout</Link></li>}
                    </ul>
            </div>
        </div>
       <Routes>
        <Route path="/posts" element={<Posts token={token}/>}></Route>
        <Route path="/register" element={<Register token={token} setToken={setToken} />}></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
       </Routes>
    </div>
    )
}


export default App;