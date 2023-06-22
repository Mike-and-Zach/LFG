import { useState } from "react";
import { callApi } from "../api/utils";
import allGames from "./GameInfo";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const EditPost = ({ postId, postUserId }) => {
  const [editGameTitle, setEditGameTitle] = useState("Call of Duty");
  const [editDescription, setEditDescription] = useState("");
  const [editGameActivity, setEditGameActivity] = useState("");
  const [editUserSystem, setEditUserSystem] = useState("");
  const [editSelectedGame, setEditSelectedGame] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);


  const userId = localStorage.getItem("userId");

  const handleEditPost = async () => {
    try {
      const data = await callApi({
        method: "PATCH",
        path: `/posts/${postId}`,
        body: {
          gameTitle: editGameTitle,
          description: editDescription,
          game_activity: editGameActivity,
          system: editUserSystem,
        },
      });
      const postIdData = await callApi({
        path: `posts/${postId}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-post-form">
      {showEditForm && (
        <div className="edit-post-form-inner">
          <form>
            <div className="allgames-select">
              <label htmlFor="gameTitle"></label>
              <p className="system-header">Game</p>
              <select
                name="activities"
                id="activities"
                className="game-title-select"
                onChange={(e) => {
                  setEditSelectedGame(e.target.value);
                  setEditGameTitle(e.target.value);
                }}
              >
                {allGames.map((game, i) => {
                  return (
                    <option key={i} value={game.title}>
                      {game.title}
                    </option>

                  );
                })}
              </select>
              <p className="system-header">Activity</p>
              <select
                name="activities"
                id="activities"
                className="game-title-select"
                onChange={(e) => {
                  setEditGameActivity(e.target.value);
                }}
              >
                {allGames.map((game) => {
                  if (game.title === editSelectedGame) {
                    return game.activities.map((activity, index) => {
                      return (
                        <option key={index} value={activity}>
                          {activity}
                        </option>
                      );
                    });
                  }
                })}
              </select>
              <div className="system-selection">
              <p className="system-header">System</p>

                <input
                  type="radio"
                  id="xbox"
                  name="system"
                  value="Xbox"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setEditUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="xbox" className="system-label">
                  Xbox
                </label>


                <input
                  type="radio"
                  id="playstation"
                  name="system"
                  value="Playstation"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setEditUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="playstation" className="system-label">
                  Playstation
                </label>


                <input
                  type="radio"
                  id="pc"
                  name="system"
                  value="PC"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setEditUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="pc" className="system-label">
                  PC
                </label>
            </div>
            </div>
            <label
              htmlFor="description"
              className="create-post-description-lable"
            >
              Description:{" "}
            </label>{" "}
            <textarea
              id="description"
              className="description-text"
              onChange={(e) => setEditDescription(e.target.value)}
            ></textarea>
            <div className="edit-post-submit-btn-container">
              <input
                type="submit"
                value="Confirm"
                onClick={() => handleEditPost()}
                className="submit-post-btn"
              />
            </div>
          </form>
          <p className="arrow-right"><ArrowRightOutlinedIcon sx={{fontSize: 45}}/></p>
        </div>
      )}

      { postUserId == userId && <button
        className="edit-post-btn"
        onClick={() => setShowEditForm(!showEditForm)}
      >
        <EditNoteOutlinedIcon />
      </button>}
    </div>
  );
};

export default EditPost;
