import { useState, useEffect } from "react";
import { callApi } from "../api/utils";
import moment from "moment";
import { handleTime } from "../helpers/handleTime";


const Comments = ({postId, allComments, setAllComments, token}) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const username = localStorage.getItem("username");

  const fetchAllComments = async () => {
    try {
      const data = await callApi({
        path: "/comments",
      });
      setAllComments(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllComments();
  }, []);

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
        await callApi({
          method: "POST",
          path: `/comments/${postId}`,
          body: { username_comment: username, message: comment },
          token,
        });

        fetchAllComments();
      } catch (err) {
        setCommentError(err);
        console.error(err);
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
                            {handleTime(comment.sent_time)} 
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
                      onClick={(e) => handleCommentSubmit(e, postId)}
                      className={comment.length > 0 ? "add-comment-btn-active" : "add-comment-btn-closed"}
                    >Post</button>
                    </div>
                </form>
                {commentError && <p className="comment-error">{commentError}</p>}

              </div>

    )
}

export default Comments

