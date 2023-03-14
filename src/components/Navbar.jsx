import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import "../navbar.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Buyable from '../images/Buyable3.png'



function Navigationbar() {
    
    const {loggedIn, user, logout}= useContext(AuthContext)
  return (
    <div >
    <div></div>
    <Navbar style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} variant="dark">
    <Container>
    <Navbar.Brand href="/"><img className='navlogo' src={Buyable} alt="" /></Navbar.Brand>
          <Nav className="me-auto">
    {loggedIn ? (
        <>

        <NavDropdown style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} title={user.name} id="basic-nav-dropdown">
          <NavDropdown.Item style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} href="/products">Products</NavDropdown.Item>
          <NavDropdown.Item style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} href="/myproducts">MyProducts</NavDropdown.Item>
          <NavDropdown.Item style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} href="/products/new">Sell</NavDropdown.Item>            
          <NavDropdown.Item style={{backgroundColor:"#3FB8C3", color:"#D0EBD7"}} href="/profile">Profile</NavDropdown.Item>
          </NavDropdown>
            <div className='flex-nav'>
            
            <button  onClick={logout} className="cta">
    <span className="hover-underline-animation">Logout </span>
    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal" color="white">
        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
    </svg>
</button>
            </div>
</>
    ): (
        <>
        
        <Nav.Link style={{marginLeft:"70vw"}} href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            
            
 </>
    )}
    </Nav>
        </Container>
      </Navbar>
      </div>
  )
}

export default Navigationbar

