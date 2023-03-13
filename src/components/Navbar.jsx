import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import "../navbar.css";

function Navbar() {
    const {loggedIn, user, logout}= useContext(AuthContext)
  return (
    <nav className="nav">
    <Link to="/" >Buyable </Link>
    {loggedIn ? (
        <>
    <Link to="/products" >Products </Link>
    <Link to="/products/new" >Add Product </Link>
    <button onClick={logout}>Logout</button>
</>
    ): (
        <>
    <Link to="/signup" >Signup</Link>
    <Link to="/login" >Login </Link>
 </>
    )}
    </nav>
  )
}

export default Navbar

