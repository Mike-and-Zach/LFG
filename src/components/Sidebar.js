
import allGames from "./GameInfo"
import { Link } from "react-router-dom"

const Sidebar = ({setSelectedGame}) => {

    return (
        <div className="sidebar-container">
                    <h1 className="sidebar-header">Games</h1>
                    {allGames.map((game, i) => {
                        return (
                           <Link to="/posts" key={i} className="sidebar-link-name" onClick={() => setSelectedGame(game.title)}>{game.title}</Link> 
                        )
                    })}
            </div>
            
    )
}

export default Sidebar;