import React from "react";
import { useLocation } from 'react-router-dom';
import DisplayBackground from '../../Components/DisplayBackground/DisplayBackground';

export default function RegionalDetails() {
  const location = useLocation();
  const state = location.state;
  console.log(location);
  
  console.log(state);

  // TODO for tomorrow:
  // set up UI for the regional page
  // fix pagination component
  // Create drop down which allows user to switch regions
  // install date picker
  // Email and ask about the custom time range 
  return ( 
    <>
      <DisplayBackground>
        <h1>Regional Page </h1>
        </DisplayBackground>
    </>
  )
}