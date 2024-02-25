import React from 'react';
import { Nav } from 'react-bootstrap';

const NavLink = ({ href, children }) => (
  <Nav.Link href={href}>{children}</Nav.Link>
);

export default NavLink;
