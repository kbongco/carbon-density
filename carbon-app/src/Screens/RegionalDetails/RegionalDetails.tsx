import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import DisplayBackground from '../../Components/DisplayBackground/DisplayBackground';
import DataChart from "../../Components/Chart";
import DataCards from "../../Components/DataCards/DataCards";
import Select from '../../Components/Select/Select';
import './RegionalDetails.scss';

export default function RegionalDetails() {
  const [selectedValue, setSelectedValue] = useState('');
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
  console.log(state.allRegion, 'test');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log(value);
  };

  const regionOptions = state.allRegions?.map((region: any) => ({
    value: region.regionid,
    label: region.dnoregion
  }))

  // TODO for tomorrow:
  // set up UI for the regional page
  // fix pagination component
  // Create drop down which allows user to switch regions
  // install date picker
  return (
    <>
      <DisplayBackground>
        <div className='carbon-density-select-region'>
          <h1>Select Region</h1>
          <Select label='Choose an option' options={regionOptions} value={selectedValue} onChange={handleChange} />
        </div>
      </DisplayBackground>
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
            <div className='carbon-density-data-container'>
              <div className='carbon-density-information-container'>
                <div className='carbon-density-card-container'>
                  <DataCards>
                    <p className='carbon-forecast-header'>Forecast</p>
                    <p>{state.selectedRegion.intensity.forecast}</p>
                  </DataCards>
                </div>
                <div className='carbon-density-card-container'>
                  <DataCards>
                    <p className='carbon-forecast-header'>Index</p>
                    <p>{state.selectedRegion.intensity.index}</p>
                  </DataCards>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DisplayBackground>
    </>
  )
}