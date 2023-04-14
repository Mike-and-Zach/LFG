import { useState } from "react";
import { callApi } from "../api/utils";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const data = await callApi({
          method: "POST",
          path: "/users/register",
          body: { username, email, password },
        });
        console.log("RegisterData :>> ", data);
        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("userId", data.user.id);
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/posts");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container-main">
      <div className="user-register-inner">
        <h1 className="register-header-main">Register</h1>
        <form>
          <div className="login-label-container">
            <label htmlFor="username">Username:</label>
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="password">Password:</label>
          </div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="password">Confirm Password:</label>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="register-submit-btn-container">
            <input
              type="submit"
              value="Create Account!"
              className="register-submit-btn"
              onClick={(e) => handleCreateUser(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
