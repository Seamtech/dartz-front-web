import React from 'react';
import logo from '../../../assets/img/logo2.png';
import Navbar from 'react-bootstrap/Navbar';

const Logo = () => (
  <Navbar.Brand href="/">
    <img src={logo} alt="Logo" className="logo" />
  </Navbar.Brand>
);

export default Logo;