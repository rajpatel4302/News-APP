import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      {/* <div> */}
        <a className="logo">News App</a>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/world">World</Link></li>
          <li><Link to="/technology">Technology</Link></li>
          <li><Link to="/business">Business</Link></li>
          <li><Link to= "/sports">Sports</Link></li>
          <li><Link to="/entertainment">Entertainment</Link></li>
        </ul>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;