import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const RegionalCarbonIntensityContext = createContext<any | undefined>(undefined);

export const CarbonRegionalProvider= ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.carbonintensity.org.uk/regional');
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);
  return (
    <RegionalCarbonIntensityContext.Provider value={{ data }}>
      {children}
    </RegionalCarbonIntensityContext.Provider>
  );
}

export const useRegionCarbonIntensity = () => {
  const context = useContext(RegionalCarbonIntensityContext);
  if (!context) {
    throw new Error('useCarbonIntensity must be used within a CarbonIntensityProvider');
  }
  return context;
};