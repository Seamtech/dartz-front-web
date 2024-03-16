import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo2.png';

const Logo = () => (
  <Link to="/">
    <img src={logo} alt="Logo" className="logo" />
  </Link>
);

export default Logo;
