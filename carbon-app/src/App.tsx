import React from 'react';
import './App.scss';
import NavBar from './Layout/NavBar/NavBar';
import Home from './Screens/Home/Home';

const App = () => {
  return (
    <>
      <div className='carbon-app-container'>
        <NavBar />
        <Home/>
      </div>
    </>
  );
};

export default App;