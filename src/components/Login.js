import { useState } from "react";
import { callApi } from "../api/utils"
import { useNavigate } from "react-router-dom";

const Login = ({token, setToken}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    console.log('token :>> ', token);
    const handleLogin = async (e) => {

        try {
            const data = await callApi({
                method: "POST",
                body: {email, password},
                path: "/users/login"
            })
            setToken(data.token)
            console.log('LoinData :>> ', data);
            navigate("/posts")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Email:</label> <br />
                <input type="text" id="username" onChange={e => setEmail(e.target.value)}/> <br />
                <label htmlFor="password">password:</label> <br />
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} /> <br /> <br />
                <input type="submit" value="Login" onClick={handleLogin}/>
            </form>
        </div>
    )
}

export default Login