import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';




export default function DataChart({ todayData }: any) {
  Chart.register(PieController, ArcElement, Tooltip, Legend);
  const dataNames = todayData?.generationData?.generationmix?.map((name: { fuel: string; }) => name.fuel || []);
  const dataNumbers = todayData?.generationData?.generationmix?.map((percent: { perc: number }) => percent.perc);

  const [initialAspectRatio, setInitialAspectRatio] = useState(1);

  useEffect(() => {
    const handleInitialAspectRatio = () => {
      if (window.innerWidth >= 1020) {
        setInitialAspectRatio(2); // Set initial aspect ratio to 2 for larger screens
      } else {
        setInitialAspectRatio(1); // Set initial aspect ratio to 1 for smaller screens
      }
    };

    // Set initial aspect ratio based on screen size
    handleInitialAspectRatio();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleInitialAspectRatio);
    };
  }, []);

  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1020) {
        setAspectRatio(2); // Change aspect ratio for larger screens
      } else {
        setAspectRatio(1); // Reset aspect ratio for smaller screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  // const [aspectRatio, setAspectRatio] = useState(1);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1020) {
  //       console.log(window.innerWidth);
  //       setAspectRatio(2); // Change aspect ratio for larger screens
  //     } else {
  //       setAspectRatio(1); // Reset aspect ratio for smaller screens
  //       console.log(window.innerWidth);
  //     }
  //   };
    
  //   console.log(aspectRatio,window.innerWidth,'size');


  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   // Clean up event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [window.innerWidth]);

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

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: true, 
    aspectRatio: aspectRatio,
  };



  return ( 
    <>
      <div className='carbon-intensity-energy-graph'>
        <Pie 
          data={data} 
          options={chartOptions} // Pass options directly to the Pie component
        />
      </div>
    </>
  )
}
