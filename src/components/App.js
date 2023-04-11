import { useState, useEffect } from "react";;
import { Route, Routes, Link} from "react-router-dom"
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
    console.log("token ==>", token);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("token", token)
    }, [token])

    

    return (
    <div className="app-container">
        <Navbar /*setToken={setToken} username={username}*//>
        <div className="whole">
        <Sidebar /> 
        <Routes>
            <Route path="/posts" element={<Posts token={token} />}></Route>
            <Route path="/register" element={<Register token={token} setToken={setToken} />}></Route>
            <Route path="/login" element={<Login setToken={setToken} />}></Route>
            <Route path="/inbox" element={<Inbox token={token}/>}></Route>
        </Routes>
        
        </div>
        
       
    </div>

    
    )
    
}



export default App;