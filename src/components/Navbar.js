import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const Navbar = ({ setToken, setGameTitle, token }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleReloadHomePage = () => {
    navigate("/posts");
    location.reload();
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

              <Link
                to="/posts"
                className="single-links"
                onClick={handleReloadHomePage}
              >
                Home
              </Link>
            </div>
          </li>
          {username && (
            <li className="navbar-links">
              <div className="inbox-navbar-container">

                <Link to="/inbox" className="single-links">
                  Inbox
                </Link>
              </div>
            </li>
          )}

          {!username && (

              <li className="navbar-links">
                <Link to="/login" className="single-links">
                  Login
                </Link>
              </li>
          )}
          {!username && (
            <li className="navbar-links">
              <div className="register-container">
                <Link to="/register" className="single-links">
                  Register
                </Link>
              </div>
            </li>
          )}
          {username && (
            <li className="navbar-links">
              <div className="logout-container">
                <Link
                  to="/login"
                  className="single-links"
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
        <div className="dropdown-menu-icon-container">
          <MenuIcon
            sx={{ fontSize: 30 }}
            onClick={() => setOpenDropdown(!openDropdown)}
          />
        </div>

        {openDropdown && (
          <DropdownMenu
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setGameTitle={setGameTitle}
            token={token}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
