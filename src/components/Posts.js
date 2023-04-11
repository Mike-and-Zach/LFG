import { callApi } from "../api/utils"
import { useState, useEffect } from "react"
import Post from "./Post"
const Posts = ({ token }) => {
    const [posts, setPosts ] = useState([]);
    const [showMakePost, setShowMakePost] = useState(false);
    const [gameTitle, setGameTitle] = useState("");
    const [description, setDescription] = useState("");
    const fetchPosts = async () => {
        try {
            const data = await callApi({
                path: "/posts"
            })
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchPosts()
    }, [])

    const handleMakePost = async () => {
        try {
            const userId = window.localStorage.getItem("userId")
            const username = localStorage.getItem("username")
            const data = await callApi({
                method: "POST",
                path: `/posts/${userId}`,
                body: {username_of_post: username, gameTitle, description: description}
            })
        } catch (err) {
            console.log(err);
        }

    }

    const makePost = () => {
        return (
            <div className="create-post">
                <form>
                    <label htmlFor="gameTitle"></label> <br />
                    <select name="games" id="gameTitle" onChange={e => {setGameTitle(e.target.value)}}>
                        <option disabled selected value>-- Choose a game --</option>
                        <option value="COD">COD</option>
                        <option value="Overwatch">Overwatch</option>
                        <option value="DayZ">DayZ</option>
                        <option value="Counter-Strike 2">Counter-Strike 2</option>
                        <option value="Destiny">Destiny</option>
                        <option value="Valorant">Valorant</option>
                        <option value="Rainbow Six Siege">RB6</option>
                        <option value="GTA6">GTA6</option>
                        <option value="League of Legends">League of Legends</option>
                    </select> <br />
                    <label htmlFor="description">Description: </label> <br />
                    <textarea id="description" className="description-text" onChange={e => setDescription(e.target.value)}> </textarea> <br /> <br />
                    <button onClick={() => setShowMakePost(false)} className="close-btn">Close</button>
                    <input type="submit" value="Sumbit" onClick={() => handleMakePost()} className="submit-post-btn"/>
                </form>
            </div>
        )
    }

    return (
        <div className="posts">
            <div className="create-post-btn-and-header">
            <p className="posts-header">Posts</p> <br />
            {showMakePost && makePost()}
            <button className="create-post-btn" onClick={() => setShowMakePost(!showMakePost)}>Create Post</button>
            </div>
            
            <div>
                {<Post posts={posts} setPosts={setPosts} token={token} />}
            </div>
        </div>
    )
}

export default Posts