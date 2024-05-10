import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import DisplayBackground from '../../Components/DisplayBackground/DisplayBackground';
import DataChart from "../../Components/Chart";
import DataCards from "../../Components/DataCards/DataCards";
import Select from '../../Components/Select/Select';
import './RegionalDetails.scss';
import { Options } from "../../interfaces/component-interfaces";
import { dateOptions } from "../../constants/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegionalDetails() {
  const [selectedValue, setSelectedValue] = useState<any>('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [date, setDate] = useState<any>(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const location = useLocation();
  const state = location.state;
  const getDate = new Date(); // Current date and time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric'
  };
  const currentDate = getDate.toLocaleDateString('en-US', options);
  const chartData = state?.selectedRegion?.generationmix;
  const { regionid } = useParams();
  const [currentRegion, setCurrentRegion] = useState(null); 
  console.log(regionid,'test')
  console.log(chartData);
  console.log(location);

  console.log('test');

  const handleChange = (value: number) => {
    setSelectedValue(value);
    const matchedRegion = state.allRegions.find((region:any) => region.regionid == value);
    setSelectedRegion(matchedRegion);
  };

  const regionOptions = state?.allRegions?.map((region: any) => ({
    value: region?.regionid,
    label: region?.dnoregion
  }))
  console.log(regionOptions);

  const similarIndex = state?.allRegions?.filter((region: any) => (
    region?.intensity?.index === state?.selectedRegion?.intensity?.index
  ));

  const handleDateChange = (range:any) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };



  console.log(similarIndex);

  function changeIntensityTextColor(intensity: unknown) {
    switch (intensity) {
      case 'low':
        return 'low-intensity';
      case 'moderate':
        return 'moderate-intensity';
      case 'high':
        return 'high-intensity';
      default:
        return 'black';
    }
  }

  useEffect(() => {
    // Perform filtering logic based on selectedRegion data
    if (selectedRegion) {
      console.log(selectedRegion,'sel')
      const filteredRegion = state?.allRegions.find((region: any) => region.regionid == selectedRegion);
      console.log(filteredRegion, 'fil');
      // const filteredRegion = /* Your filtering logic here */;
      console.log(currentRegion, 'testes')
      setCurrentRegion(filteredRegion);
    }
  }, [selectedRegion]);

  console.log(currentRegion)

  // TODO for tomorrow:
  // fix pagination component
  // Get Regional Data and get the select dropdown to work properly
  // Anything date related tomorrow 
  // install date picker
  return (
    <>
      <DisplayBackground>
        <div className='carbon-density-select-region'>
          {/* <h1>Select Region</h1> */}
          <h1>Regional Details for Region ID: {regionid}</h1>

          <Select label='Choose an option' options={regionOptions} value={selectedValue} onChange={handleChange} />
        </div>
        <div>
          <Link to='/'>
            Go back Home
          </Link>
        </div>
      </DisplayBackground>
      <DisplayBackground>
        <h1>{state?.selectedRegion?.dnoregion} </h1>
        <div className='carbon-density-regional-graph-container'>
          <div className='carbon-density-all-information-container'>
            <div className='carbon-density-graph-information'>
              <p className='carbon-density-text'> Carbon Intensity Data for {currentDate}</p>
              <div className='carbon-density-graph'>
                <DataChart chartData={state?.selectedRegion} />
              </div>
            </div>
            <div className='carbon-intensity-regional-data-container'>
              <div className='carbon-intensity-regional-data'>
                <div className='carbon-intensity-regional-information-container'>
                  <div className='carbon-intensity-regional-card-container'>
                    <DataCards>
                      <p className='carbon-intensity-forecast-header'>Forecast</p>
                      <p className='carbon-intensity-regional-forecast-text'>{state?.selectedRegion?.intensity?.forecast}</p>
                    </DataCards>
                  </div>
                  <div className='carbon-intensity-regional-card-container'>
                    <DataCards>
                      <p className='carbon-intensity-forecast-header'>Index</p>
                      <p className='carbon-intensity-regional-forecast-text'>{state?.selectedRegion?.intensity?.index}</p>
                    </DataCards>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DisplayBackground>
      <div className='carbon-intensity-regional-information'>
        <DisplayBackground>
          <h1>View Carbon Intensity During a specific date</h1>
          <Select label="Quick Select a range" options={dateOptions} value={selectedValue} onChange={handleChange} />

          <div>
            <p>Select a date here </p>
            
            <DatePicker
              selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange />
    </div>
        </DisplayBackground>
        <DisplayBackground>
          <h1>Regions with similar Carbon Index</h1>
          <div className='carbon-intensity-similar-container'>
          {similarIndex?.slice(0, 3).map((similar: any) => (
  <div className='carbon-intensity' key={similar?.regionid}>
    <DataCards>
      <p className='carbon-intensity-similar-name'>{similar?.dnoregion}</p>
      <div className='carbon-intensity-similar-link'>
        {/* Pass state along with the URL */}
        <Link to={{
          pathname: `/regional-data/${similar?.regionid}`,
  // Pass the state object
                  }}
                  state={state}>
          View Region Details
        </Link>
      </div>
    </DataCards>
  </div>
))}
            {similarIndex?.slice(0, 3).map((similar: any) => (
              <div className='carbon-intensity'>
                <DataCards key={similar?.regionid}>
                  <p className='carbon-intensity-similar-name'>{similar?.dnoregion}</p>
                  <div className='carbon-intensity-similar-link'>
                  <Link to={`/regional-data/${regionid}`}>View Region Details</Link>

                  </div>
                </DataCards>
              </div>
            ))}
          </div>
        </DisplayBackground>
      </div>
    </>
  )
}