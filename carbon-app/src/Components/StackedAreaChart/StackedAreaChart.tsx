import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


export default function StackedAreaChart({ timeInterval, data }: any) {
  console.log(timeInterval,'int')
  console.log(data);

  const generateLabels = (interval: string) => {
    const labels: string[] = [];
    const now = new Date();
  

    const match = interval.match(/^(\d+)(\w+)$/);
    if (!match) {
      console.error('Invalid interval format:', interval);
      return labels;
    }
  
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
  
   
    let startDate;
    console.log('Unit:', unit); // Debugging
    if (unit === 'hours') {
      startDate = new Date(now.getTime() - value * 60 * 60 * 1000);
    } else if (unit === 'days') {
      startDate = new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
    } else if (unit === 'weeks' || unit === 'week') {
      startDate = new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
    } else if (unit === 'month' || unit === 'months') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
      startDate.setMonth(startDate.getMonth() - value);
    } else {
      console.error('Unsupported unit:', unit);
      return labels;
    }
  
    console.log('Start Date:', startDate); // Debugging

    if (unit === 'month' || unit === 'months') {
      let currentDate = new Date(startDate);
      for (let i = 0; i < value * 24 * 30; i++) {
        const date = new Date(currentDate.getTime() + i * 60 * 60 * 1000);
        labels.push(date.toISOString());
      }
    } else if (unit === 'weeks' || unit === 'week') {
      let currentDate = new Date(startDate);
      for (let i = 0; i < value * 7 * 24; i++) {
        const date = new Date(currentDate.getTime() + i * 60 * 60 * 1000);
        labels.push(date.toISOString());
      }
    } else {
      for (let i = 0; i < value; i++) {
        startDate.setHours(startDate.getHours() + 1); // Increment hour by one
        labels.push(startDate.toISOString());
      }
    }
  
    return labels;
  };

  const graphLabels = generateLabels(timeInterval);
  const fuelColors:any = {
    biomass: 'rgba(255, 99, 132, 0.2)',
    coal: 'rgba(54, 162, 235, 0.2)',
    gas: 'rgba(255, 206, 86, 0.2)',
    hydro: 'rgba(75, 192, 192, 0.2)',
    imports: 'rgba(153, 102, 255, 0.2)',
    nuclear: 'rgba(255, 159, 64, 0.2)',
    other: 'rgba(255, 99, 132, 0.2)',
    solar: 'rgba(54, 162, 235, 0.2)',
    wind: 'rgba(75, 192, 192, 0.2)'
  };
  const datasets = Object.entries(data).map(([fuel, perc]) => ({
    label: fuel.charAt(0).toUpperCase() + fuel.slice(1), 
    data: Array(1).fill(perc), 
    backgroundColor: fuelColors[fuel], 
    borderColor: fuelColors[fuel],
    borderWidth: 1,
    fill: true
}));
  console.log(graphLabels);

  console.log(datasets,);
  
  const chartData = {
    labels: graphLabels,
    datasets: datasets
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        type: 'time' as const, // Specify type as 'time'
        time: {
          parser: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
          tooltipFormat: 'll HH:mm',
          unit: 'hour' as const,
          displayFormats: {
            hour: 'MMM D, HH:mm',
          },
        },
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  





  console.log(generateLabels(timeInterval));


  // const chartData = {
  //   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  //   datasets: [
  //     {
  //       label: 'Gas',
  //       data: [20, 30, 40, 50, 60, 70, 80],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       fill: true,
  //     },
  //     {
  //       label: 'Coal',
  //       data: [10, 20, 30, 40, 50, 60, 70],
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //       fill: true,
  //     },
  //     // Add more datasets for other fuel types
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     x: {
  //       type: 'category',
  //       stacked: true,
  //     },
  //     y: {
  //       stacked: true,
  //     },
  //   },
  // };

  return ( 
    <>
    <Line data={chartData} options={chartOptions} />
    </>
  )
}