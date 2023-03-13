import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { name, email, password }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="formdiv">

<form className="form" onSubmit={handleSubmit}>
  <p>Signup</p>
  <div className="group" >
    <input required="true" className="main-input" type="text" value={name} onChange={handleName} />
    <span className="highlight-span"></span>
    <label className="lebal-email">Name</label>
  </div>
  <br />
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
     <p className="auth-paragraph">Already have an account? <Link className="link" to="/Login">Login</Link></p> 
      
    </section>
  );
}

export default Signup;

