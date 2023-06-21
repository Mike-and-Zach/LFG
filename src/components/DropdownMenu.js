import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import DropdownGameMenu from "./DropdownGameMenu";

const DropdownMenu = ({openDropdown, setOpenDropdown, setGameTitle, token}) => {
    const [openGameMenu, setOpenGameMenu] = useState(false)
    return (
        <div className= {openDropdown ? "dropdown-container-active" : "dropdown-container-closed"}>
            <div className={!openGameMenu ? "dropdown-close-icon-active" : "dropdown-close-icon"} ><CloseIcon sx={{fontSize: 35}} onClick={() => setOpenDropdown(!openDropdown)}/></div>
            <div className="dropdown-link-container">
                <Link to="/posts" onClick={() => setOpenDropdown(false)}>Home</Link>
                <Link onClick={() => setOpenGameMenu(true)}>Games</Link>
                {token && <Link to="/inbox" onClick={() => setOpenDropdown(false)}>Inbox</Link>}
                {!token && <Link to="/login" onClick={() => setOpenDropdown(false)}>Login</Link>}
                {token && <Link onClick={() => setOpenDropdown(false)}>Logout</Link>}
            </div>
            {openGameMenu && <DropdownGameMenu setOpenDropdown={setOpenDropdown} setGameTitle={setGameTitle}/> }
        </div>
    )
}

export default DropdownMenu;