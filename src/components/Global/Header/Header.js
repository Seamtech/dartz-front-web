import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './Logo';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import './Header.css';

const Header = () => {
  // Use useSelector to access the isLoggedIn part of the state
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log('Logged In: ' + isLoggedIn);
  return (
    <div className="header">
      <Logo />
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="nav">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/chat">Chat</NavLink>
            <NavLink href="/players/findplayer">Find Player</NavLink>
            <NavDropdown title="Tournaments" items={[{ title: "Tournaments", href: "/tournaments" }, { title: "TournamentRules", href: "/tournamentrules" }]} />
            <NavDropdown title="Z Leagues" items={[{ title: "Z League", href: "/zleagues" }]} />
            <NavLink href="/leaderboards">Leaderboards</NavLink>
            <NavLink href="/rules">Rules</NavLink>
            {/* Conditional rendering based on isLoggedIn */}
            {!isLoggedIn ? (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/signup">Signup</NavLink>
              </>
            ) : (
              <>
              <NavLink href="/myaccount">My Account</NavLink>
              <NavLink href="/logout">Logout</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;