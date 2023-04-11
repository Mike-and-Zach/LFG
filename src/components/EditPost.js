import { useState } from "react";
import { callApi } from "../api/utils";

const EditPost = ({postId}) => {
    const [gameTitle, setGameTitle] = useState("")
    const [description, setDescription] = useState("");
    const [originalDescription, setOriginalDescription] = useState("")
    const handleEditPost = async () => {
        console.log('description :>> ', description);
        try {
            const data = await callApi({
                method: "PATCH",
                path: `/posts/${postId}`,
                body: {
                    gameTitle: gameTitle,
                    description: description
                }
            })
            const postIdData = await callApi({
                path: `posts/${postId}`
            })
            setOriginalDescription(postIdData.description)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="edit-post-form">
            <form>
            <label htmlFor="gameTitle"></label> <br />
                    <select name="games" id="gameTitle" onChange={e => {setGameTitle(e.target.value)}}>
                        <option>-- Choose a game --</option>
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
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" id="description" className="description-text" onChange={e => {setDescription(e.target.value)}}> </textarea> <br /> <br />
                    <input type="submit" value="confirm" onClick={() => handleEditPost()}/>
            </form>
        </div>
    )
}

export default EditPost