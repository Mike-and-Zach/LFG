import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import DropdownGameMenu from "./DropdownGameMenu";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({openDropdown, setOpenDropdown, setGameTitle, token, setToken}) => {
    const [openGameMenu, setOpenGameMenu] = useState(false);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        swal({
            text: "Thank you for visiting!",
          });
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setToken("");
        navigate("/login");
        setOpenDropdown(false);
      }

    return (
        <div className= {openDropdown ? "dropdown-container-active" : "dropdown-container-closed"}>
            <div className={!openGameMenu ? "dropdown-close-icon-active" : "dropdown-close-icon"} ><CloseIcon sx={{fontSize: 35}} onClick={() => setOpenDropdown(!openDropdown)}/></div>
            <ul className="dropdown-link-container">
                <Link to="/posts" onClick={() => setOpenDropdown(false)}>Home</Link>
                <Link onClick={() => setOpenGameMenu(true)}>Games</Link>
                {token && <Link to="/inbox" onClick={() => setOpenDropdown(false)}>Inbox</Link>}
                {!token && <Link to="/login" onClick={() => setOpenDropdown(false)}>Login</Link>}
                {token && <Link onClick={e => handleLogout(e)}>Logout</Link>}
                {!token && <Link to="/register" onClick={() => setOpenDropdown(false)}>Register</Link>}
            </ul>
            { openGameMenu && <DropdownGameMenu setOpenDropdown={setOpenDropdown} setGameTitle={setGameTitle}/>}
        </div>
    )
}

export default DropdownMenu;