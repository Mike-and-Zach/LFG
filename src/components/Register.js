import { useState } from "react"
import {callApi} from "../api/utils"
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {

    const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                const data = await callApi({
                    method: "POST",
                    path: "/users/register",
                    body: {username, email, password}
                })
                console.log('RegisterData :>> ', data);
                window.localStorage.setItem("username", data.user.username);
                window.localStorage.setItem("userId", data.user.id);
                setToken(data.token)
                navigate("/posts")
            } else {
                console.log("error");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">Username:</label> <br />
                <input type="text" id="username" onChange={e => setUsername(e.target.value)}/> <br />
                <label htmlFor="email">Email:</label> <br />
                <input type="text" id="email" onChange={e => setEmail(e.target.value)}/> <br />
                <label htmlFor="password">Password:</label> <br />
                <input type="password" id="password" onChange={e => setConfirmPassword(e.target.value)} /> <br />
                <label htmlFor="password">Confirm Password:</label> <br />
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} /> <br />
                <input type="submit" value="Create Account!" onClick={(e) => handleCreateUser(e)}/>
            </form>
        </div>
    )
}

export default Register