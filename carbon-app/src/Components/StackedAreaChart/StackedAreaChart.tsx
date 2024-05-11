import React from 'react';
import { Line } from 'react-chartjs-2';

export default function StackedAreaChart({ timeInterval }: any) {
  console.log(timeInterval,'int')

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
      {/* <Line data={chartData} />; */}
    </>
  )
}