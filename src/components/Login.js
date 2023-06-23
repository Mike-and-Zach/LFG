import { useState } from "react";
import { callApi } from "../api/utils";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const data = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/login",
      });
      setToken(data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userId", data.user.id);
      swal({
        text: "Welcome Back!",
      });
      navigate("/posts");
    } catch (err) {
      setLoginError(err)
      console.error(err);
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-inner">
        <h1 className="login-header-page">Login</h1>
        <form className="login-form">
          <div className="login-label-container">
            <label htmlFor="username" className="login-label">
            </label>{" "}
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input-login"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <div className="login-label-container">
            <label htmlFor="password" className="login-label">
            </label>{" "}

          </div>
          <input
            type="password"
            placeholder="Password"
            className="input-login"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {loginError && <p className="login-error">{loginError}</p>}
          <div className="test-login">
          <p>Test Email: testemail@gmail.com</p> <p>Test Password: password</p>
          </div>
          <div className="login-btn-form-container">
            <input
              type="submit"
              value="Login"
              className="login-btn-form"
              onClick={handleLogin}
            />
          </div>
        </form>


      </div>

    </div>
  );
};

export default Login;
