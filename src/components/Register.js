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
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setRegisterError("");
    
    try {
      if (password !== confirmPassword) {
        setRegisterError("Passwords do not match!")
      } else {
        const data = await callApi({
          method: "POST",
          path: "/users/register",
          body: { username, email, password },
        });
        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("userId", data.user.id);
        // window.localStorage.setItem("token", data.token);
        setToken(data.token);
        
        navigate("/posts");
      }
    } catch (err) {
      setRegisterError(err)
      console.error(err);
    }
  };

  return (
    <div className="register-container-main">
      <div className="user-register-inner">
        <h1 className="register-header-main">Register</h1>
        <form className="register-form">
          <div className="login-label-container">
            <label htmlFor="username"></label>
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="email"></label>
          </div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="password"></label>
          </div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="login-label-container">
            <label htmlFor="password-confirm"></label>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            id="password-confirm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="register-error">{registerError}</p>
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
