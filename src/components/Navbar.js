import { useNavigate, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ setToken }) => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleReloadHomePage = () => {
    navigate("/posts");
    location.reload()
    
  };

  return (
    <div className="navbar-container">
      <Link to="/posts" onClick={handleReloadHomePage}>
      <div className="navbar-group1">
        <img src="/img/lfg-logo.jpeg" />
        <h2 className="header">ImLFG</h2>
      </div>
      </Link>
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
             <div className="login-container">
            <li className="navbar-links">
             
                <LoginIcon fontSize="small" sx={{ fontSize: 20 }} />
                <Link to="/login" className="single-links">
                  Login
                </Link>
            </li>
            </div>

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
          <li className="menu-icon">
      <MenuIcon sx={{fontSize: 30}}/>

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
