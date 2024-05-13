// DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const RegionalContext = createContext(null);

export const DataProvider = ({ children }:any) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.carbonintensity.org.uk/regional');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    return () => {
      setApiData(null);
    };
  }, []);

  return (
    <RegionalContext.Provider value={apiData}>
      {children}
    </RegionalContext.Provider>
  );
};

export const useData = () => {
  return React.useContext(RegionalContext);
};
