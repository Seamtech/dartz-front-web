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
  const isLoggedIn = useSelector(state => Boolean(state.user.token));
  return (
    <div className="header">
      <Logo />
      <Navbar expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/chat">Chat</NavLink>
            <NavLink to="/players/findplayer">Find Player</NavLink>
            <NavDropdown title="Tournaments" items={[{ title: "Tournaments", href: "/tournaments" }, { title: "TournamentRules", href: "/tournamentrules" }]} />
            <NavDropdown title="Z Leagues" items={[{ title: "Z League", href: "/zleagues" }]} />
            <NavLink to="/leaderboards">Leaderboards</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            {/* Conditional rendering based on isLoggedIn */}
            {!isLoggedIn ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            ) : (
              <>
              <NavLink to="/myaccount">My Account</NavLink>
              <NavLink to="/logout">Logout</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;