import { useEffect, useState } from "react";
import { callApi } from "../api/utils";

const Post = ({posts}) => {
    const [showTextBox, setShowTextBox] = useState(false)
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const fetchAllComments = async () => {
        try {
            const data = await callApi({
                path: "/posts/comments"
            })
            setAllComments(data)
            console.log('data :>> ', data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchAllComments()
    }, [])

    const handleCommentSubmit = async (postId) => {
        try {
                await callApi({
                method: "POST",
                path: `/posts/comments/${postId}`,
                body: { message: comment}
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
                        <h4>Game:</h4>
                        <p>{post.gameTitle}</p>
                        <h4>Description:</h4>
                        <p>{post.description}</p>
                        <h4>Comments:</h4>
                        {allComments.filter(comment => comment.postId === post.id).map((comment => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.message}</p>
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