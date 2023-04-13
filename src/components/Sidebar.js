
import allGames from "./GameInfo"

const Sidebar = ({setSelectedGame}) => {

    return (
        <div className="sidebar-container">
                    <h1 className="sidebar-header">Games</h1>
                    {allGames.map((game, i) => {
                        return (
                            <p key={i} className="sidebar-name" onClick={() => setSelectedGame(game.title)}>{game.title}</p>
                        )
                    })}
            </div>
            
    )
}

export default Sidebar;