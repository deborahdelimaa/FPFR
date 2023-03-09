import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function Navbar() {
    const {loggedIn, user, logout}= useContext(AuthContext)
  return (
    <nav>
    <Link to="/" >Home </Link>
    {loggedIn ? (
        <>
    <Link to="/projects" >Projects </Link>
    <Link to="/projects/new" >Add Project </Link>
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