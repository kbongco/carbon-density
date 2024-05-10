import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default function DataChart({ chartData }: any) {
  const dataNames = chartData?.generationmix?.map((name: { fuel: string; }) => name.fuel || []);
  const dataNumbers = chartData?.generationmix?.map((percent: { perc: number }) => percent.perc);
  console.log(chartData);

  const [initialAspectRatio, setInitialAspectRatio] = useState(1);

  useEffect(() => {
    const handleInitialAspectRatio = () => {
      setInitialAspectRatio(window.innerWidth >= 1020 ? 2 : 1);
    };

    handleInitialAspectRatio();

    return () => {
      window.removeEventListener('resize', handleInitialAspectRatio);
    };
  }, []);

  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth >= 1020 ? 2 : 1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: true, 
    aspectRatio: aspectRatio,
  };

  return ( 
    <div className='carbon-intensity-energy-graph'>
      <Pie 
        data={data} 
        options={chartOptions} 
      />
    </div>
  );
}
