import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { carbonIntensityAPI } from '../../constants/constants'
import { IntensityData } from '../../interfaces/national-interface';

export default function Home() {

  const [todayData, setTodayData] = useState<unknown>([])

  useEffect(() => {
    const getData = async () => {
      try {
        axios.get(carbonIntensityAPI).then((response) => {
          console.log(response.data);
          setTodayData(response.data);
        }).catch((error) => {
          console.error(error);
        })
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
      </section>
    </>
  )
}