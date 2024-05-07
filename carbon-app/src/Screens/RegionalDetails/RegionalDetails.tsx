import React from "react";
import { useLocation } from 'react-router-dom';

export default function RegionalDetails() {
  const location = useLocation();
  const state = location.state;
  console.log(location);
  
  console.log(state);
  return ( 
    <>
      <h1>Regional Page </h1>
    </>
  )
}