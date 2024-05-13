import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function BarGraph({ data }: any) {
  const [chartData, setChartData] = useState<any>(null);


  useEffect(() => {
    if (data) {
      const fuels = Object.keys(data);
      const percentages = Object.values(data);

      const newChartData = {
        labels: fuels,
        datasets: [{
          label: 'Percentage',
          data: percentages,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      };


      setChartData(newChartData);
    } else {
      // If data is empty, set chart data to null
      setChartData(null);
    }
  }, [data]);


  if (!chartData) {
    return <div>No data available</div>;
  }


  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fuel Type',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
