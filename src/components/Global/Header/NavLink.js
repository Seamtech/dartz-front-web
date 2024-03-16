import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavLink = ({ to, children }) => (
  <Nav.Link as={Link} to={to}>{children}</Nav.Link>
);

export default NavLink;