import React from "react";
import { useLocation } from 'react-router-dom';
import DisplayBackground from '../../Components/DisplayBackground/DisplayBackground';
import DataChart from "../../Components/Chart";

export default function RegionalDetails() {
  const location = useLocation();
  const state = location.state;
  const getDate = new Date(); // Current date and time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric'
  };
  const currentDate = getDate.toLocaleDateString('en-US', options);
  const chartData = state.selectedRegion.generationmix;
  console.log(chartData);
  console.log(location);
  
  console.log(state.selectedRegion.dnoregion);

  // TODO for tomorrow:
  // set up UI for the regional page
  // fix pagination component
  // Create drop down which allows user to switch regions
  // install date picker
  // Email and ask about the custom time range 
  return ( 
    <>
      <DisplayBackground>
        <h1>{state.selectedRegion.dnoregion} </h1>
        <div className='carbon-density-graph-container'>
          <div className='carbon-density-all-information-container'>
            <div className='carbon-density-graph-information'>
              <p className='carbon-density-text'> Carbon Intensity Data for {currentDate}</p>
              <div className='carbon-density-graph'>
              <DataChart chartData={state.selectedRegion} />
              </div>
            </div>
          </div>
        </div>
        </DisplayBackground>
    </>
  )
}