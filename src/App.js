import React, { useState } from 'react';
import {  Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import World from './component/World';
import Business from './component/Business';
import Technology from './component/Technology';
import Sports from './component/Sports';
import Entertainment from './component/Entertainment';
import Newsshow from './component/Newsshow';

function App() {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for...`);
  };
  return (
    <div>
        <Navbar searchQuery={searchQuery} handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
        <Routes>
        <Route exact path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/world" element={<World searchQuery={searchQuery} />} />
        <Route path="/technology" element={<Technology searchQuery={searchQuery} />} />
        <Route path="/business" element={<Business searchQuery={searchQuery} />} />
        <Route path="/sports" element={<Sports searchQuery={searchQuery}/>} />
        <Route path="/entertainment" element={<Entertainment searchQuery={searchQuery}/>}/>
        <Route  path="/newsshow/" element={<Newsshow searchQuery={searchQuery}/>}/>
      </Routes>
    </div>
  );
}

export default App;  