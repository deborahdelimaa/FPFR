import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <section>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        
        <input type="text" value={name} onChange={handleName} placeholder="Name" />
        <br />        
        <input type="email" value={email} onChange={handleEmail} placeholder="Email" />
        <br />       
        <input type="password" value={password} onChange={handlePassword} placeholder="Password"/>
        <br />
        <button type="submit">Create account</button>

      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      
    </section>
  );
}

export default Signup;
