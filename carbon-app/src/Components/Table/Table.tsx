import React from "react";

export default function Table({allRegions, onViewData}:any) {
  const columns = 'test';
  console.log(allRegions)
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
        {allRegions?.[0]?.regions?.map((regionData:any, index:any) => (
            <tr key={index}>
    <td>{regionData.dnoregion}</td>
    <td>{regionData.intensity?.forecast}</td>
    <td>{regionData.intensity?.index}</td>
              <td>
                <button onClick={() => console.log('View')}>View Data</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}