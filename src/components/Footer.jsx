import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Footer() {
  return (
    <div>
<Navbar className='footer' collapseOnSelect expand="lg" bg="green" variant="light">
      <Container>
        <Navbar.Brand style={{fontSize:"1em"}}> © All rights reserved to Buyables</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Duarte França" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://www.linkedin.com/in/duarte-franca/">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/Duartefranca">
                Github
              </NavDropdown.Item>
              
              
            </NavDropdown>
          <Nav>
          <NavDropdown title="Déborah de Lima" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://www.linkedin.com/in/deborahdelima/">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/deborahdelimaa">
                Github
              </NavDropdown.Item>
              </NavDropdown>
          </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default Footer