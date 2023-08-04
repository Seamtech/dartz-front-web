import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo2.png';

const Header = () => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/chat">Chat</Nav.Link>
            <Nav.Link href="/players">Find Player</Nav.Link>
            
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>Tournaments</Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu'>
                <Dropdown.Item className='dropdown-item' href="/tournaments1">Tournament 1</Dropdown.Item>
                <Dropdown.Item href="/tournaments2">Tournament 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>Z Leagues</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/zleagues1">Z League 1</Dropdown.Item>
                <Dropdown.Item href="/zleagues2">Z League 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link href="/leaderboards">Leaderboards</Nav.Link>
            <Nav.Link href="/rules">Rules</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;