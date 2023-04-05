import React from 'react';
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
  return (
    <div>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/entertainment" element={<Entertainment/>}/>
        <Route  path="/newsshow/" element={<Newsshow/>}/>
      </Routes>
    </div>
  );
}

export default App;  