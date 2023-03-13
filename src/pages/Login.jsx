import React, { useState,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../auth.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const navigate = useNavigate();


  const {authenticateUser} = useContext(AuthContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

        // To store the token on the localStorage - Only for the login

        localStorage.setItem("authToken", response.data.authToken)

        authenticateUser()

      console.log(response.data.authToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="formdiv">

<form className="form" onSubmit={handleSubmit}>
  <p>Login</p>
  <div className="group">
    <input required="true" className="main-input" type="text" value={email} onChange={handleEmail} />
    <span className="highlight-span"></span>
    <label className="lebal-email">Email</label>
  </div>
  <div className="container-1">
    <div className="group">
      <input required="true" className="main-input" type="password" value={password} onChange={handlePassword} />
      <span className="highlight-span"></span>
      <label className="lebal-email">Password</label>
    </div>
  </div>
  <button className="submit">submit</button>
</form> 
      <p className="auth-paragraph">Don't have an account? <Link className="link" to="/signup">Signup</Link></p> 
    </section>
  );
}

export default Login;
