import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './Logo';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import './Header.css'
const Header = () => (
  <div className="header">
    {/* Logo now outside Navbar to allow for flexible positioning */}
    <Logo />
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-center">
        <Nav className="nav">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/chat">Chat</NavLink>
          <NavLink href="/players">Find Player</NavLink>
          <NavDropdown title="Tournaments" items={[{ title: "Tournaments", href: "/tournaments" }, { title: "TournamentRules", href: "/tournamentrules" }]} />
          <NavDropdown title="Z Leagues" items={[{ title: "Z League", href: "/zleagues" }]} />
          <NavLink href="/leaderboards">Leaderboards</NavLink>
          <NavLink href="/rules">Rules</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
