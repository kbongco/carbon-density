import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { carbonIntensityAPI, carbonIntensityFactors, carbonIntensityRegional, getRegionalLocationData } from '../../constants/constants'
import { IntensityData } from '../../interfaces/national-interface';
import Chart from '../../Components/Chart';

export default function Home() {

  const [todayData, setTodayData] = useState<unknown>({
    intensityData: null,
    generationData: null
  })
  const [regionalData, setRegionalData] = useState<unknown>({
    england: null,
    wales: null,
    scotland: null,
    allRegions: null
})

  useEffect(() => {
    const getData = async () => {
      try {
        const [todaysResponse, todaysGenerationResponse, englandResponse, walesResponse, scotlandResponse, allRegionResponse] = await Promise.all([
          axios.get(carbonIntensityAPI),
          axios.get(carbonIntensityFactors),
          axios.get(getRegionalLocationData('england')),
          axios.get(getRegionalLocationData('wales')),
          axios.get(getRegionalLocationData('scotland')),
          axios.get(carbonIntensityRegional),
        ]);
        setTodayData({
          intensityData: todaysResponse.data.data,
          generationData: todaysGenerationResponse.data.data
        })
        setRegionalData({
          england: englandResponse.data.data,
          wales: walesResponse.data.data,
          scotland: scotlandResponse.data.data,
          allRegions: allRegionResponse.data.data
        });
        console.log(todayData);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  console.log(todayData);
  

  return ( 
    <>
      <section className='carbon-density-home-info'>
        <p className='carbon-density-text'>
          Carbon Intensity Data for today
        </p>
        <Chart todayData={todayData} />
      </section>
    </>
  )
}