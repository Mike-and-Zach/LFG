import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import moment from "moment"

const Post = ({posts, token}) => {
    const [showTextBox, setShowTextBox] = useState(false)
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
    console.log('username :>> ', username);

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
                path: "/posts/comments"
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
                path: `/posts/comments/${postId}`,
                body: {username_comment: username, message: comment}
            })
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div>
            {posts.slice(0).reverse().map(post => {
                return (
                    <div key={post.id}>
                        <h4>user: {post.username_of_post}</h4>
                        <h4>Game:</h4>
                        <p>{post.gameTitle}</p>
                        <h4>Description:</h4>
                        <p>{post.description}</p>
                        <h4>Comments:</h4>
                        {allComments.filter(comment => comment.postId === post.id).reverse().map((comment => {
                            return (
                                <div key={comment.id}>
                                    <p>user: {comment.username_comment}</p>
                                    <p>{comment.message}</p>
                                    <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            )
                        }))}
                        {showTextBox && 
                        <form>
                            <input type="text" onChange={e => {setComment(e.target.value)}}/> <br />
                            <input type="submit" value="Add Comment" onClick={() => handleCommentSubmit(post.id)}/>
                        </form>} <br />
                        <button onClick={() => setShowTextBox(!showTextBox)}>Comment</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Post