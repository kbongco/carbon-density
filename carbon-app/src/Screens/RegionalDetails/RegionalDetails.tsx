import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import DisplayBackground from '../../Components/DisplayBackground/DisplayBackground';
import DataChart from "../../Components/Chart";
import DataCards from "../../Components/DataCards/DataCards";
import Select from '../../Components/Select/Select';
import './RegionalDetails.scss';
import { dateOptions } from "../../constants/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Region } from "../../interfaces/regional-interface";
import { calculateStartDate, convertDateISO } from '../../utils/calculateStartDate';
import getDataByDate from '../../services/getIntensityByDate';
import Barchart from '../../Components/Barchart/Barchart'
import calculateGenerationMixAverage from '../../utils/calculateGenerationMix';
import calculateAverageIntensity from '../../utils/calculateAverageForecast';
import LineChart from '../../Components/LineChart/LineChart';
import calculateIndex from '../../utils/calculateIndex';
import changeIntensityTextColor from '../../utils/changeIntensityTextColor';

export default function RegionalDetails() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<any>('');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [date, setDate] = useState<any>(new Date());
  const [quickSelectDateStart, setquickSelectDateStart] = useState<any>(null);
  const [quickSelectDateValue, setQuickSelectDateValue] = useState<any>('');
  const [selectedDateData, setSelectedDateData] = useState<any>(null);
  const location = useLocation();
  const state = location.state;
  const { regionid } = useParams();
  console.log(regionid,'regions')
  const [selectedRegionid, setSelectedRegionId] = useState<any>(() => regionid);
  const [timePeriodAverage, setTimePeriodAverage] = useState<number>(0);


  const getDate = new Date(); // Current date and time
  const currentDateISOTime = new Date().toISOString();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric'
  };
  const currentDateToDisplay = getDate.toLocaleDateString('en-US', options);
  const chartData = state?.selectedRegion?.generationmix;
  const [currentRegion, setCurrentRegion] = useState(null);
  const [gerationMixAverageData, setGenerationMixAverageData] = useState([]);
  const [averageForecastByDay, setAverageForecastByDay] = useState<any>(
    []
  );
  const [clickedPoint, setClickedPoint] = useState(null);



  const handleChange = (value: number) => {
    setSelectedValue(value);

    const matchedRegion = state?.allRegions?.find((region: Region) => region.regionid == value);
    setSelectedRegion(matchedRegion);
    setSelectedRegionId(value);


    navigate(`/regional-data/${value}`, { replace: true });
  };

  const regionOptions = state?.allRegions?.map((region: Region) => ({
    value: region?.regionid,
    label: region?.dnoregion
  }))

  const handlePointClick = (value: any) => {
    setClickedPoint(value);
  };

  const quickSelectDateChange = (value: string) => {
    const quickDate = calculateStartDate(value);
    const finalDate: any = convertDateISO(quickDate);
    setquickSelectDateStart(finalDate);
    setQuickSelectDateValue(value);


    getDataByDate(finalDate, currentDateISOTime, selectedRegionid)
      .then(data => {
        setSelectedDateData(data);
        const byDayAverage = calculateAverageIntensity(data.data.data);
        const totalLengthAv = byDayAverage.length;
        setAverageForecastByDay(byDayAverage);
        const totalAv = byDayAverage.map((av: any) => av.average).reduce((acc: any, cur: any) => acc + cur, 0);
        const actualAverage = Math.round(totalAv) / totalLengthAv;
        setTimePeriodAverage(actualAverage);
        const averageTotal = calculateGenerationMixAverage(data.data.data);
        setGenerationMixAverageData(averageTotal);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedRegion) {
      console.log(selectedRegion, 'sel')
      const filteredRegion = state?.allRegions.find((region: Region) => region.regionid == selectedRegion);
      setCurrentRegion(filteredRegion);
    }
  }, [selectedRegion]);


  useEffect(() => {
    // Update selectedRegionid whenever regionid changes
    setSelectedRegionId(regionid);
  }, [regionid]); // Run this effect whenever regionid changes

  useEffect(() => {
  }, [selectedDateData])


  return (
    <>
      <DisplayBackground>
        <div className='carbon-density-select-region'>
          <h1>Select Region</h1>

          <Select label='Choose an option' options={regionOptions} value={selectedValue} onChange={handleChange} />
        </div>
        <div>
          <Link to='/'>
            Go back Home
          </Link>
        </div>
      </DisplayBackground>
      <DisplayBackground>
        {selectedRegion !== null ? <><h1>{selectedRegion?.dnoregion}</h1>
          <div className='carbon-density-regional-graph-container'>
            <div className='carbon-density-all-information-container'>
              <div className='carbon-density-graph-information'>
                <p className='carbon-density-text'> Carbon Intensity Data for {currentDateToDisplay}</p>
                <div className='carbon-density-graph'>
                  <DataChart chartData={selectedRegion} />
                </div>
              </div>
              <div className='carbon-intensity-regional-data-container'>
                <div className='carbon-intensity-regional-data'>
                  <div className='carbon-intensity-regional-information-container'>
                    <div className='carbon-intensity-regional-card-container'>
                      <DataCards>
                        <p className='carbon-intensity-forecast-header'>Forecast</p>
                        <p className='carbon-intensity-regional-forecast-text'>{selectedRegion?.intensity?.forecast}</p>
                      </DataCards>
                    </div>
                    <div className='carbon-intensity-regional-card-container'>
                      <DataCards>
                        <p className='carbon-intensity-forecast-header'>Index</p>
                        <p className='carbon-intensity-regional-forecast-text'>{selectedRegion?.intensity?.index}</p>
                      </DataCards>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> </> : <><h1>{state?.selectedRegion?.dnoregion} </h1>
          <div className='carbon-density-regional-graph-container'>
            <div className='carbon-density-all-information-container'>
              <div className='carbon-density-graph-information'>
                <p className='carbon-density-text'> Carbon Intensity Data for {currentDateToDisplay}</p>
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
          </div> </>}
      </DisplayBackground>
      <div className='carbon-intensity-regional-information'>
        <DisplayBackground>
          <h1>View Carbon Intensity in select intervals</h1>
          <div>
          <Select label="Quick Select a range" options={dateOptions} value={quickSelectDateValue} onChange={quickSelectDateChange} />
          </div>
          {selectedDateData !== null ? <>
            <p>Generation Mix Average
            </p>
            <Barchart data={gerationMixAverageData} />
            <LineChart data={averageForecastByDay} onPointClick={handlePointClick} />
          </> : ''}
        </DisplayBackground>
        <DisplayBackground>
          <div className='carbon-intensity-regional-information'>
            <h1>Information</h1>
            <ul>
              <li>What is generation mix?</li>
              <ul>
                <li>The generation mix is the fuel type which contributes to the overal Carbon intensity. It includes all CO2 emissions related to electricity generation</li>
              </ul>
            </ul>

            <div>
              <h3>Average for Selected Date Range</h3>
              <DataCards>
                <p>Intensity Average for time span</p>
                <p>{Math.round(timePeriodAverage)}</p>
              </DataCards>
                  {/* <p>{Math.round(timePeriodAverage)}</p> */}
              </div>
              {clickedPoint ? (
                <div className='selected-date-card-container-all'>
                  <div className='selected-date-card-container'>
                    <DataCards>
                      <p className='selected-date-card-header'>Carbon Intensity</p>
                      <p className="selected-date-card-text">{Math.round(clickedPoint)}</p>
                    </DataCards>
                  </div>

                  <div className='selected-date-card-container'>
                    <DataCards>
                      <p className='selected-date-card-header'>Index</p>
                      <p className={`selected-date-card-text-intensity ${changeIntensityTextColor(calculateIndex(clickedPoint))}`}>
                        {calculateIndex(clickedPoint)}
                      </p>
                    </DataCards>
                  </div>
              </div>
              
              ) : (
                <h2>Click on a point in the graph to get more details</h2>
              )}
          </div>
        </DisplayBackground>
      </div>
    </>
  )
}
