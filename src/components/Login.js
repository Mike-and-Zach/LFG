import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">username:</label> <br />
                <input type="text" id="username" onChange={e => setUsername(e.target.value)}/> <br />
                <label htmlFor="password">password:</label> <br />
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Create Account!" onClick={() => handleCreateUser()}/>
            </form>
        </div>
    )
}

export default Login