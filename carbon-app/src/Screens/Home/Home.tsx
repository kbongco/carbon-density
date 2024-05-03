import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { carbonIntensityAPI, carbonIntensityRegional, getRegionalLocationData } from '../../constants/constants'
import { IntensityData } from '../../interfaces/national-interface';

export default function Home() {

  const [todayData, setTodayData] = useState<unknown>([])
  const [regionalData, setRegionalData] = useState<unknown>({
    england: null,
    wales: null,
    scotland: null,
    allRegions: null
})

  useEffect(() => {
    const getData = async () => {
      try {
        const [todaysResponse, englandResponse, walesResponse, scotlandResponse, allRegionResponse] = await Promise.all([
          axios.get(carbonIntensityAPI),
          axios.get(getRegionalLocationData('england')),
          axios.get(getRegionalLocationData('wales')),
          axios.get(getRegionalLocationData('scotland')),
          axios.get(carbonIntensityRegional),
        ]);
        setTodayData(todaysResponse.data);
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

  return ( 
    <>
      <section className='carbon-density-home-info'>
        <p className='carbon-density-text'>
          Carbon Intensity Data for today
        </p>
      </section>
    </>
  )
}