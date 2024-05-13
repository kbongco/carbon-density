import React from 'react';
import './App.scss';
import NavBar from './Layout/NavBar/NavBar';
import Home from './Screens/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './Context/RegionalDataContext';
import RegionalDetails from './Screens/RegionalDetails/RegionalDetails';

const App = () => {
  return (
    <>
      <DataProvider>
      <div className='carbon-app-container'>
        <NavBar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/regional-data/:regionid"  element={<RegionalDetails/>}/>
          </Routes>
        </div>
      </DataProvider>
    </>
  );
};

export default App;