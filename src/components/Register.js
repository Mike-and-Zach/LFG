import { useState } from "react"
import {callApi} from "../api/utils"


const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    console.log('username, password :>> ', username, password);

    const handleCreateUser = async () => {
        try {
            const data = await callApi({
                method: "POST",
                path: "/users/register",
                body: {username, email, password}
            })
            console.log('createUserData :>> ', data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">username:</label> <br />
                <input type="text" id="username" onChange={e => setUsername(e.target.value)}/> <br />
                <label htmlFor="email">email:</label> <br />
                <input type="text" id="email" onChange={e => setEmail(e.target.value)}/> <br />
                <label htmlFor="password">password:</label> <br />
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Create Account!" onClick={() => handleCreateUser()}/>
            </form>
        </div>
    )
}

export default Register