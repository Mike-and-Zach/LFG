import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import allGames from "./GameInfo";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Sidebar = ({ setGameTitle }) => {

  return (
    <div className="sidebarContainer">
          <h1 className="sidebar-header">Games</h1>
          {allGames.map((game, i) => {
            return (
              <div className="sidebar-link-name-container" key={i}>
              <Link
                to="/posts"
                key={i}
                className="sidebar-link-name"
                onClick={() => {
                  console.log('game.title :>> ', game.title);
                  setGameTitle(game.title)
                }}
              >
                {game.title}
              </Link>
              </div>
            );
          })}

      
    </div>
  );
};

export default Sidebar;
