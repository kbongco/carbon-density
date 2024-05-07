import React from 'react';
import './App.scss';
import NavBar from './Layout/NavBar/NavBar';
import Home from './Screens/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegionalDetails from './Screens/RegionalDetails/RegionalDetails';

const App = () => {
  return (
    <>
      <div className='carbon-app-container'>
        <NavBar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/regional-details' element={<RegionalDetails/>}/>
          </Routes>
      </div>
    </>
  );
};

export default App;