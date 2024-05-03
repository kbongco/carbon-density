import './NavBar.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {

  return ( 
    <>
      <nav className='carbon-navbar'>
        <div className='carbon-navbar-container-icon'>
        <FontAwesomeIcon icon={faCloud} />
        </div>
        <h1>CarbonData</h1>
      </nav>
    </>
  )
}