import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./Logo";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import "./Header.css";
import { useUpdateNavHistory } from "../../../hooks";

const Header = () => {
  const [expanded, setExpanded] = useState(false); // State to manage navbar collapse
  const isLoggedIn = useSelector((state) => Boolean(state.user.token));
  useUpdateNavHistory();

  const handleCollapse = () => {
    setExpanded(false); // Collapse the navbar
  };

  return (
    <div className="header">
      <Logo />
      <Navbar
        expand="sm"
        className="navbar"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="nav">
            <NavLink to="/" onClick={handleCollapse}>
              Home
            </NavLink>
            <NavLink to="/chat" onClick={handleCollapse}>
              Chat
            </NavLink>
            <NavLink to="/players/find-player" onClick={handleCollapse}>
              Find Player
            </NavLink>
            <NavDropdown
              title="Tournaments"
              items={[
                { title: "Tournaments", href: "/tournaments" },
                { title: "TournamentRules", href: "/tournamentrules" },
              ]}
              onCollapse={handleCollapse}
            />
            <NavDropdown
              title="Leagues"
              items={[
                { title: "Z Challenge", href: "/league/league-challenges" },
                { title: "Z League", href: "/league/z-league" },
                { title: "Remote League", href: "/league/remote-leagues" },
                { title: "Travel League", href: "/league/travel-leagues" },
              ]}
              onCollapse={handleCollapse}
            />
            <NavLink to="/leaderboards" onClick={handleCollapse}>
              Leaderboards
            </NavLink>
            <NavLink to="/rules" onClick={handleCollapse}>
              Rules
            </NavLink>
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" onClick={handleCollapse}>
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={handleCollapse}>
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/myaccount" onClick={handleCollapse}>
                  My Account
                </NavLink>
                <NavLink to="/logout" onClick={handleCollapse}>
                  Logout
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
