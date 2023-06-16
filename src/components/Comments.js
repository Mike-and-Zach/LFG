import { useState, useEffect } from "react";
import { callApi } from "../api/utils";
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";


const Comments = ({postId}) => {
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const username = localStorage.getItem("username");


  const timeNow = moment();

  const fetchAllComments = async () => {
    try {
      const data = await callApi({
        path: "/comments",
      });
      setAllComments(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllComments();
  }, []);

  const handleCommentSubmit = async (postId) => {
    try {
      await callApi({
        method: "POST",
        path: `/comments/${postId}`,
        body: { username_comment: username, message: comment },
      });
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <div>
            <div className="comments-container">

                {allComments
                  .filter((comment) => comment.postId === postId)
                  .reverse()
                  .map((comment) => {
                    return (
                      <div key={comment.id} className="ind-comment-container">
                        <div className="comment-username-and-time">
                          <p className="comment-user">
                            {comment.username_comment}
                          </p>
                          <span className="comment-time">
                            {timeNow.diff(comment.sent_time, "minutes")} mins
                            ago
                          </span>
                        </div>
                        <p className="comment-message">{comment.message}</p>
                      </div>
                    );
                  })}
              </div>

                <form className="comment-text-and-btn">
                  <textarea
                    type="text"
                    className="comment-textfield"
                    placeholder="Comment..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>

                    <div className="comment-btn-container">
                    <button
                      type="submit"
                      onClick={() => handleCommentSubmit(postId)}
                      className={comment.length > 0 ? "add-comment-btn-active" : "add-comment-btn-closed"}
                    >Post</button>
                    </div>
                </form>
              </div>

    )
}

export default Comments

