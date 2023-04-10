// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'

// function Navbar() {
//   return (
//     <nav className="navbar">
//         <a className="logo">News App</a>
//         <ul className="menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/world">World</Link></li>
//           <li><Link to="/technology">Technology</Link></li>
//           <li><Link to="/business">Business</Link></li>
//           <li><Link to= "/sports">Sports</Link></li>
//           <li><Link to="/entertainment">Entertainment</Link></li>
//         </ul>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

function Navbar({searchQuery, handleSearchSubmit, handleSearchChange, selectedValue, handleSelectChange}) {


  return (
    <nav className="navbar">
      <a className="logo">News App</a>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/world">World</Link></li>
        <li><Link to="/technology">Technology</Link></li>
        <li><Link to="/business">Business</Link></li>
        <li><Link to="/sports">Sports</Link></li>
        <li><Link to="/entertainment">Entertainment</Link></li>
      </ul>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <br></br>
      <Dropdown 
        selectedValue={selectedValue}
        handleSelectChange={handleSelectChange}
      />
    </nav>
  );
}

export default Navbar;
