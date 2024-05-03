import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend);

export default function Chart({ todayData }: any) {
  console.log(todayData);
  return ( 
    <>
      <h1>This is a test of the chart component</h1>
      <div>
        {/* <Pie 
          data={data}
          options={options}
        /> */}
      </div>
    </>
  )
}