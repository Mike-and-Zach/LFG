import { useNavigate, Link, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Inbox from "./Inbox";
import Register from "./Register";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Navbar = ({ token, setToken }) => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleReloadHomePage = () => {
    navigate("/posts");
    window.location.reload()
    
  };

  return (
    <div className="navbar-container">
      <Link to="/posts" onClick={handleReloadHomePage}>
      <div className="navbar-group1">
        <img src="/img/lfg-logo.jpeg" />
        <h2 className="header">ImLFG</h2>
      </div>
      </Link>
      <div className="socials">
        <InstagramIcon className="social" id="insta" fontSize="large" />
        <FacebookIcon className="social" fontSize="large" />
        <TwitterIcon className="social" fontSize="large" />
      </div>
      <div className="link-container">
        <ul className="navbar">
          <li className="navbar-links">
            <div className="home-container">
              <HomeIcon sx={{ fontSize: 20 }} />
              <Link
                to="/posts"
                className="single-links"
                id="home"
                onClick={handleReloadHomePage}
              >
                Home
              </Link>
            </div>
          </li>
          {username && (
            <li className="navbar-links">
              <div className="inbox-navbar-container">
                <MailIcon fontSize="small" sx={{ fontSize: 18 }} />
                <Link to="/inbox" className="single-links">
                  Inbox
                </Link>
              </div>
            </li>
          )}

          {!username && (
            <li className="navbar-links">
              <div className="login-container">
                <LoginIcon fontSize="small" sx={{ fontSize: 20 }} />
                <Link to="/login" className="single-links">
                  Login
                </Link>
              </div>
            </li>
          )}
          {!username && (
            <li className="navbar-links">
              <div className="register-container">
                <HowToRegIcon fontSize="small" sx={{ fontSize: 20 }} />
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </div>
            </li>
          )}
          {username && (
            <li className="navbar-links">
              <div className="logout-container">
                <LogoutIcon fontSize="small" sx={{ fontSize: 20 }} />
                <Link
                  to="/login"
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    setToken("");
                    navigate("/login");
                    swal({
                      text: "Thank you for visiting!",
                    });
                  }}
                >
                  Logout
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Routes>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/inbox" element={<Inbox token={token} />}></Route>
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          ></Route>
        </Routes>
    </div>
  );
};

export default Navbar;
