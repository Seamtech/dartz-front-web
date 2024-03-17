import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavLink = ({ to, onClick, children }) => (
  <Nav.Link as={Link} to={to} onClick={onClick}>{children}</Nav.Link>
);

export default NavLink;