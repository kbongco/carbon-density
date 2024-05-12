import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

export default function LineChart({ data, onPointClick }: any)
{
  console.log(data, 'datas-average');
  const dataLabels = data?.map((labels: any) => labels.date);
  const displayData = data?.map((forecast: any) => forecast.average);
  console.log(dataLabels);
  console.log(displayData, 'displayed')


  const handlePointClick = (event:any, elements:any) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const index = clickedElement.index;
      
      // Find the corresponding average value based on the clicked index
      const clickedData = data[index];
      const clickedValue = clickedData ? clickedData.average : null;
      console.log(clickedValue);
      
      onPointClick(clickedValue); // Call the callback function with the clicked value
    }
  };

  
  const lineData = {
    labels: dataLabels,
    datasets: [{
      label: 'Average Forecast for selected Range',
      data: displayData,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
      fill: false
    }]
  };

  const options = {
    onClick: handlePointClick,
    // Other chart options...
  };

  return ( 
    <>
      <h1>Line Chart Test</h1>
      <Line data={lineData} options={options} />
    </>
  )
}