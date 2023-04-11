import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import moment from "moment"
import EditPost from "./EditPost";

const Post = ({posts, setPosts, token, description}) => {
    console.log("description ==>>>>", description);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [directMessage, setDirectMessage] = useState("");
    const [showEditForm, setShowEditForm] = useState(false);


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

    const sendDirectMessage = async (recipientId, recipientUsername) => {
        try {
            const data = callApi({
                method: "POST",
                path: `/direct_message/${recipientId}`,
                body: {message_text: directMessage, recipient_username: recipientUsername},
                token
            })

        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            {posts.slice(0).reverse().map(post => {
                return (
                    <div key={post.id} className="post">
                        
                        <div className="game-title-container">
                            <h4>Game:</h4>
                            <p className="game-title">{post.gameTitle}</p>
                        </div>
                        <div className="description-container">
                            <p className="game-description">{post.description}</p>
                        </div>
                        <div className="comments-container">
                            <h4 className="comments-header">Comments:</h4>
                            {allComments.filter(comment => comment.postId === post.id).reverse().map((comment => {
                                return (
                                    <div key={comment.id} className="ind-comment-container">
                                        <p className="comment-message">{comment.message}</p>
                                        <div className="comment-username-and-time">
                                            <p className="comment-user">- {comment.username_comment}</p>
                                            <span className="comment-time">{moment().format('MMMM Do YYYY, h:mm a')}</span>
                                        </div>
                                    </div>
                                )
                            }))}
                        </div>
                        <form>
                            <textarea type="text" onChange={e => {setComment(e.target.value)}}></textarea> <br />
                            <input type="submit" value="Add Comment" onClick={() => handleCommentSubmit(post.id)} className="add-comment-btn"/>
                        </form> <br />
                        <div className="created-post-user">
                            <h4 className="post-headers">Posted By: </h4>
                            <p className="user-of-post">{post.username_of_post}</p>
                        </div>
                        <div>
                            {showMessageForm && <form>
                                <input type="text" onChange={e => setDirectMessage(e.target.value)}/>
                                <input type="submit" value="send" onClick={() => {sendDirectMessage(post.userId, post["username_of_post"])}}/>
                            </form>}
                        </div>
                        {post.userId != userId && <button className="message-user-btn" onClick={() => setShowMessageForm(!showMessageForm)}>Message User</button>}
                        <div className="delete-post-btn-container">
                            {showEditForm && <EditPost postId={post.id} />}
                            <button className="edit-post-btn" onClick={() => setShowEditForm(!showEditForm)}>edit post</button>
                            {post.userId == userId && <button className="delete-post-btn" onClick={() => handleDeletePost(post.id)}>DELETE POST</button>}
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Post

