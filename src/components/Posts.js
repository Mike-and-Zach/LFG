import { callApi } from "../api/utils"
import { useState, useEffect } from "react"
import Post from "./Post"
const Posts = () => {
    const [posts, setPosts ] = useState([])
    const [showMakePost, setShowMakePost] = useState(false)
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
            const data = await callApi({
                method: "POST",
                path: "/posts",
                body: {gameTitle, description}
            })
            console.log('makePostData :>> ', data);
        } catch (err) {
            console.log(err);
        }

    }

    const makePost = () => {
        return (
            <div>
                <form>
                    <label htmlFor="gameTitle">Choose your game: </label> <br />
                    <select name="games" id="gameTitle" onChange={e => {setGameTitle(e.target.value)}}>
                        <option disabled selected value>-- Choose a game --</option>
                        <option value="COD">COD</option>
                        <option value="Overwatch">Overwatch</option>
                        <option value="DayZ">DayZ</option>
                        <option value="Counter-Strike 2">Counter-Strike 2</option>
                        <option value="Destiny">Destiny</option>
                        <option value="Valorant">Valorant</option>
                        <option value="RB6">RB6</option>
                        <option value="GTA6">GTA6</option>
                        <option value="League of Legends">League of Legends</option>
                    </select> <br />
                    <label htmlFor="description">Description: </label> <br />
                    <input type="text" id="description" onChange={e => {setDescription(e.target.value)}}/> <br /> <br />
                    <input type="submit" value="Create Post!" onClick={() => handleMakePost()}/>
                </form>
            </div>
        )
    }

    const makePostButton = () => {
        return (
            <button onClick={() => setShowMakePost(!showMakePost)}>Make Post</button>
        )
    }

    return (
        <div>
            <h1>Posts</h1>
            {showMakePost && makePost()}
            {!showMakePost && makePostButton()}
            <div>
                {<Post posts={posts}/>}
            </div>
        </div>
    )
}

export default Posts