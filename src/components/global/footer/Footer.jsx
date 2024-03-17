import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Footer.css';
const Footer = () => {
  // Use useSelector to access the isLoggedIn part of the state
  const isLoggedIn = useSelector(state => Boolean(state.user.token));

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Text>
          &copy; {new Date().getFullYear()}
        </Navbar.Text>
        {/* Conditional rendering based on isLoggedIn */}
        {!isLoggedIn ? (
          <>
            {/* Render Login and Signup links for non-logged in users */}
            <Link to="/login" className="navbar-link mx-2">Login</Link>
            <Link to="/signup" className="navbar-link mx-2">Signup</Link>
          </>
        ) : (
          <>
            {/* Render Logout link for logged-in users */}
            <Link to="/logout" className="navbar-link mx-2">Logout</Link>
          </>
        )}
        {/* Contact Us link always shown */}
        <Link to="/contact" className="navbar-link mx-2">Contact</Link>
      </Container>
    </Navbar>
  );
}

export default Footer;
