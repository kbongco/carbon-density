import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { carbonIntensityAPI, carbonIntensityFactors, carbonIntensityRegional, getRegionalLocationData } from '../../constants/constants'
import { CombinedData, IntensityData } from '../../interfaces/national-interface';
import DataCards from '../../Components/DataCards/DataCards';
import DataChart from '../../Components/Chart';
import Table from '../../Components/Table/Table';
import Pagination from '../../Components/Pagination/Pagination';
import { Region } from '../../interfaces/regional-interface';
import getDateOneWeekAgo from '../../utils/calculateDateMonth';
import getDateOneMonthAgo from '../../utils/calculateDateMonth';

interface RegionalData {
  allRegions: Region[];
  // Other properties...
}

export default function Home() {
  const [todayData, setTodayData] = useState<CombinedData>({
    intensityData: null,
    generationData: null
  });

  const [regionalData, setRegionalData] = useState<any>({
    england: null,
    wales: null,
    scotland: null,
    allRegions: null
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Current');

  const getDate = new Date(); // Current date and time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric'
  };
  const currentDate = getDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const getData = async () => {
      try {
        const [todaysResponse, todaysGenerationResponse, englandResponse, walesResponse, scotlandResponse, allRegionResponse] = await Promise.all([
          axios.get(carbonIntensityAPI, { cancelToken: source.token }),
          axios.get(carbonIntensityFactors, { cancelToken: source.token }),
          axios.get(getRegionalLocationData('england'), { cancelToken: source.token }),
          axios.get(getRegionalLocationData('wales'), { cancelToken: source.token }),
          axios.get(getRegionalLocationData('scotland'), { cancelToken: source.token }),
          axios.get(carbonIntensityRegional, { cancelToken: source.token }),
        ]);

        setTodayData({
          intensityData: todaysResponse.data.data,
          generationData: todaysGenerationResponse.data.data
        });
        setRegionalData({
          england: englandResponse.data.data,
          wales: walesResponse.data.data,
          scotland: scotlandResponse.data.data,
          allRegions: allRegionResponse.data.data
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      }
    };

    getData();

    return () => {
      source.cancel();
    };
  }, []);

  console.log(selectedRegion?.regionid,'sel');



  const totalItemsRegions = regionalData.allRegions?.[0]?.regions?.length;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleViewData = (regionData: any) => {
    setSelectedRegion(regionData);
  };

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

  const todayDateISO = new Date().toISOString();
  const oneWeekAgo = getDateOneWeekAgo(todayDateISO);
  const oneMonthAgo = getDateOneMonthAgo(todayDateISO);
  const [apiData, setApiData] = useState(null);
  const regionId = selectedRegion?.regionid;
  let weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
console.log(weekAgo.toLocaleString());

useEffect(() => {
  const fetchApiData = async () => {
    let startDate, endDate;

    if (selectedPeriod === 'Week') {
      let weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      startDate = weekAgo.toISOString();
      endDate = todayDateISO;
    } else if (selectedPeriod === 'Month') {
      startDate = getDateOneMonthAgo(todayDateISO);
      endDate = todayDateISO;
    } else {
      startDate = todayDateISO;
      endDate = todayDateISO;
    }

    const apiUrl = `https://api.carbonintensity.org.uk/regional/intensity/${startDate}/${endDate}/regionid/${regionId}`;

    try {
      const response = await axios.get(apiUrl);
      const filteredData = response.data.data.data.filter((entry: { from: string; to: string; }) => {
        const fromTime = entry.from.split('T')[1].split(':')[0];
        const toTime = entry.to.split('T')[1].split(':')[0];
        return fromTime === '00' && toTime === '00';
      });
      console.log(filteredData);
      // console.log(filteredData)
      setApiData(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (selectedPeriod === 'Week' || selectedPeriod === 'Month') {
    fetchApiData();
  }
}, [selectedPeriod, regionId]);


  const handlePeriodClick = (period: any) => {
    console.log('no')
    setSelectedPeriod(period);
    console.log(period);
  };

  // TODO: 
  // Display API data for Month and Week
  // Move Regional Section into its own Component
  // Fix up sorting implementation on the UI 
  // Create Detail Page design 

  return (
    <>
      <section className='carbon-density-home-info'>
        <div className='carbon-density-graph-container'>
          <div className='carbon-density-all-information-container'>
            <div className='carbon-density-graph-information'>
              <p className='carbon-density-text'>
                Carbon Intensity Data for {currentDate}
              </p>
              <div className='carbon-density-graph'>
                <DataChart todayData={todayData} />
              </div>
            </div>
            <div className='carbon-density-data-container'>
              <div className='carbon-density-information-container'>
                <div className='carbon-density-card-container'>
                  <DataCards>
                    <p className='carbon-forecast-header'>Forecast</p>
                    <p className='carbon-number-data'>{todayData?.intensityData?.[0].intensity.forecast}</p>
                  </DataCards>
                </div>
                <div className='carbon-density-card-container'>
                  <DataCards>
                    <p className='carbon-forecast-header'>Actual</p>
                    <p className='carbon-number-data'>{todayData?.intensityData?.[0].intensity.actual}</p>
                  </DataCards>
                </div>
              </div>
              <div className='carbon-density-index-container'>
                <DataCards>
                  <p className='carbon-forecast-header'>Index</p>
                  <p className={`carbon-data ${changeIntensityTextColor(todayData?.intensityData?.[0]?.intensity?.index)}`}>
                    {todayData?.intensityData?.[0]?.intensity?.index.toUpperCase()}
                  </p>
                </DataCards>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='carbon-density-regional-container'>
        <section className='carbon-density-regional-information'>
          <h1>Carbon Intensity by Region</h1>
          <Table
            allRegions={regionalData?.allRegions?.[0]?.regions?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
            onViewData={handleViewData}
          />
          <div className='carbon-density-pagination-container'>
            <Pagination
              totalItems={totalItemsRegions}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
        <section className='carbon-density-regional-side-panel'>
          <h1>View Regional Data</h1>
          <div className='carbon-density-select-view'>
            <ul>
              <li onClick={() => handlePeriodClick('Current')}>Current</li>
              |
              <li onClick={() => handlePeriodClick('Week')}>Week</li>
              |
              <li onClick={() => handlePeriodClick('Month')}>Month</li>
            </ul>
          </div>
          <div className='carbon-density-text'>
            {selectedRegion && (
              <>
                <h1>{selectedRegion.dnoregion}</h1>
                <div className='carbon-density-card-container'>
                  <div className='regional-card-data-info'>
                    <DataCards>
                      <p className='intensity-card-text'>Intensity Forecast</p>
                      <p className='intensity-card-text'>{selectedRegion.intensity.forecast}</p>
                    </DataCards>
                  </div>
                  <div className='carbon-density-card-container'>
                    <div className='regional-card-data-info'>
                    <DataCards>
                      <p className='intensity-card-text'>Intensity Index</p>
                      <p className='intensity-card-text'>{selectedRegion.intensity.index}</p>
                    </DataCards>
                    </div>
                  </div>
                </div>
              </>
            )}
            <p>Go to region</p>
          </div>
        </section>
      </div>
    </>
  )
}
