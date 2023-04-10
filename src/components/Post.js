import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import moment from "moment"

const Post = ({posts, setPosts, token}) => {

    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = dateNow.getMonth() + 1; // add 1 because getMonth() returns zero-based month
    const day = dateNow.getDate();
    const date = `${month}-${day}-${year}`
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const time = `${hours}:${minutes}`

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId")
    console.log('userId :>> ', userId);
    console.log('posts :>> ', posts);

function convertMilitaryToStandardTime(militaryTime) {
    // Extract hours and minutes from militaryTime
    const hours = parseInt(militaryTime.substring(0, 2));
    const minutes = militaryTime.substring(2);
  
    // Convert hours to standard time
    let standardHours = hours % 12;
    if (standardHours === 0) {
      standardHours = 12;
    }
  
    // Add leading zero to minutes if needed
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
  
    // Determine whether it's AM or PM
    const meridiem = hours < 12 ? "AM" : "PM";
  
    // Return standard time string
    return `${standardHours}:${minutes} ${meridiem}`;
  }
  
  // Example usage
  const militaryTime = "16:30";
  const standardTime = convertMilitaryToStandardTime(militaryTime);
  
    const fetchAllComments = async () => {
        try {
            const data = await callApi({
                path: "/comments"
            })
            setAllComments(data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchAllComments()
    }, [])

    const handleCommentSubmit = async (postId) => {
        console.log('postId :>> ', postId);
        try {
                await callApi({
                method: "POST",
                path: `/comments/${postId}`,
                body: {username_comment: username, message: comment}
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            const data = callApi({
                method: "DELETE",
                path: `/posts/${postId}`
            })

            setPosts(prev => prev.filter(post => postId !== post.id))
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            {posts.slice(0).reverse().map(post => {
                return (
                    <div key={post.id} className="post">
                        <div className="created-post-user">
                            <h4 className="post-headers">Posted By: </h4>
                            <p className="user-of-post">{post.username_of_post}</p>
                        </div>
                        <button className="message-user-btn">Message User</button>
                        <div className="game-title-container">
                            <h4>Game:</h4>
                            <p className="game-title">{post.gameTitle}</p>
                        </div>
                        <div className="description-container">
                            <h4>Description:</h4>
                            <p className="game-description">{post.description}</p>
                        </div>
                        <div className="comments-container">
                            <h4 className="comments-header">Comments:</h4>
                            {allComments.filter(comment => comment.postId === post.id).reverse().map((comment => {
                                return (
                                    <div key={comment.id} className="ind-comment-container">
                                        <p className="comment-user">{comment.username_comment}</p>
                                        <p className="comment-message">- {comment.message}</p>
                                        <span className="comment-time">{moment().format('MMMM Do YYYY, h:mm a')}</span>
                                    </div>
                                )
                            }))}
                        </div>
                        <form>
                            <input type="text" onChange={e => {setComment(e.target.value)}}/> <br />
                            <input type="submit" value="Add Comment" onClick={() => handleCommentSubmit(post.id)} className="add-comment-btn"/>
                        </form> <br />
                        {post.userId == userId && <button className="delete-post-btn" onClick={() => handleDeletePost(post.id)}>DELETE POST</button>}
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Post

