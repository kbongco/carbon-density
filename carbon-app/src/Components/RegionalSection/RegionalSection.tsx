import React, { useEffect, useState } from "react";
import DataCards from "../DataCards/DataCards";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import axios from "axios";
import calculateAverage from "../../utils/calculateAverage";
import getDateOneMonthAgo from "../../utils/calculateDateMonth";

export default function RegionalSection({ regionalData }: any) {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Current');
  const [averageForecast, setAverageForecast] = useState(0);
  const totalItemsRegions = regionalData?.allRegions?.[0]?.regions?.length;
  const todayDateISO = new Date().toISOString();
  let weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const regionId = selectedRegion?.regionid;

  const handlePeriodClick = (period: any) => {
    console.log('no')
    setSelectedPeriod(period);
    console.log(period);
  };

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
        const averageIntensity = calculateAverage(filteredData);
        setAverageForecast(Math.floor(averageIntensity));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedPeriod === 'Week' || selectedPeriod === 'Month') {
      fetchApiData();
    }
  }, [selectedPeriod, regionId]);

  const handleViewData = (regionData: any) => {
    setSelectedRegion(regionData);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return ( 
    <>
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
                {selectedPeriod === 'Current' && (
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
                )}
                {selectedPeriod === 'Week' && (
                  <>
                    <p>Week Data</p>
                    <DataCards>
                      <p className='intensity-card-text'>Week Average Intensity Forecast</p>
                      <p>{averageForecast}</p>
                    </DataCards>
                  </>

                )}
                {selectedPeriod === 'Month' && (
                  <>
                  <p>Month Data</p>                    
                  <DataCards>
                  <p className='intensity-card-text'>Monthly Average Intensity Forecast</p>
                  <p>{averageForecast}</p>
                    </DataCards>
                    </>
                )}
              </>
            )}
            <p>Go to region</p>
          </div>
        </section>
      </div>
    </>
  )
}