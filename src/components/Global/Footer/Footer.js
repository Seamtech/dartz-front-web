import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Navbar.Text>
          &copy; {new Date().getFullYear()} DartZ
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Footer;