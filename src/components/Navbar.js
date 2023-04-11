import { useNavigate, Link} from "react-router-dom";

const Navbar = ({setToken, username}) => {
    const navigate = useNavigate();
    return (
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
                        setToken("")
                    navigate("/login")
                    swal({
                        text: "Thank you for visiting!"
                    })
                    }}>Logout</Link></li>}
                    </ul>
            </div>
        </div>
    )
}

export default Navbar