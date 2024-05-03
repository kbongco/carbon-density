import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Chart.scss';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend);

export default function Chart({ todayData }: any) {
  const dataNames = todayData?.generationData?.generationmix?.map((name: { fuel: string; }) => name.fuel || []);
  const dataNumbers = todayData?.generationData?.generationmix?.map((percent: { perc: number }) => percent.perc);

  const data = {
    labels: dataNames,
    datasets: [
      {
        data: dataNumbers,
        backgroundColor: [
          '#006400',
          '#808080',
          '#D3D3D3',
          '#0000FF',
          '#00008B',
          '#90EE90',
          '#00008B',
          '#FFFF00',
          '#ADD8E6'
        ]
      }
    ]
  }

  // TODO figure out how to make chart responsive without having to adjust the height and figure out how to make this more reusable 

  return ( 
    <>
      <div className='carbon-intensity-energy-graph'>
        <Pie 
          data={data}
        />
      </div>
    </>
  )
}