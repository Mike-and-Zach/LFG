import allGames from "./GameInfo";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


const DropdownGameMenu = ({setOpenDropdown, setGameTitle}) => {
    const navigate = useNavigate();

    return (
        <div className="dropdown-game-menu">
            <div className="close-game-menu" onClick={() => setOpenDropdown(false)}><CloseIcon sx={{fontSize: 35}}/></div>

        <ul>
            {allGames.map((game, i) => {
                return (
                    <li key={i} onClick={() => {
                        setGameTitle(game.title);
                        setOpenDropdown(false);
                        navigate("/posts");
                    }} to="/posts">
                        {game.title}
                    </li>
                )
            })}
    </ul>
        </div>
    )
}

export default DropdownGameMenu;