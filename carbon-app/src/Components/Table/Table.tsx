import React, { useEffect, useState } from "react";
import './Table.scss';
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Table({ allRegions, currentPage, itemsPerPage, onViewData }: any) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [sortedRegions, setSortedRegions] = useState(allRegions);


  const currentPageData = allRegions?.slice(startIndex, endIndex);

  console.log(allRegions);

  const sortRegions = () => {
    if (!allRegions) return; // Check if allRegions is defined
  
    // Sort the regions based on intensity
    const sorted = [...allRegions]?.sort((a, b) => a?.intensity?.forecast - b?.intensity?.forecast);
    
    setSortedRegions(sorted); // Update the sortedRegions state with the sorted array
  };
  
  useEffect(() => {
    sortRegions();
  }, [allRegions]);
  

  return (
    <div className="table-container">
      <table>
        <thead>
        <tr>
            <th>Region</th>
            <th>
              Forecast 
              <button onClick={sortRegions}>
                <FontAwesomeIcon icon={faSortDown} />
              </button>
            </th>
            <th>Index </th>
            <th>View Data</th>
          </tr>
        </thead>
        <tbody>
          {sortedRegions?.map((regionData: any, index: any) => (
            <tr key={index}>
              <td>{regionData?.dnoregion}</td>
              <td>{regionData?.intensity?.forecast}</td>
              <td>{regionData?.intensity?.index}</td>
              <td>
                <button onClick={() => onViewData(regionData)}>View Data</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
