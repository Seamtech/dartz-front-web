import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavDropdown = ({ title, items, onCollapse }) => (
  <Dropdown as={Nav.Item}>
    <Dropdown.Toggle as={Nav.Link}>{title}</Dropdown.Toggle>
    <Dropdown.Menu>
      {items.map((item) => (
        <Dropdown.Item key={item.href} as={Link} to={item.href} onClick={onCollapse}>
          {item.title}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default NavDropdown;
