import React from "react";

export default function Table({ allRegions, currentPage, itemsPerPage, onViewData }: any) {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const currentPageData = allRegions?.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Forecast</th>
            <th>Index</th>
            <th>View Data</th>
          </tr>
        </thead>
        <tbody>
          {allRegions?.map((regionData: any, index: any) => (
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
