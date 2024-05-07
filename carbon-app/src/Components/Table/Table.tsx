import React, { useEffect, useState } from "react";
import './Table.scss';
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableComponent } from "../../interfaces/component-interfaces";

export default function Table({ data, columns, handleViewDetails }: any) {
  console.log(data, 'yes');

  const getColumnValue = (row: any, key: string) => {
    const keys = key.split('.'); 
    let value = row;
  
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
  
    // If a render function exists for the column, invoke it with the value
    const column = columns.find((col: any) => col.key === key);
    if (value && typeof value !== 'object' && column && column.render) {
      return column.render(value);
    }
  
    return value;
  };

  return (
    <div className="table-container">
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column:any, index:number) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item:any, rowIndex:any) => (
            <tr key={rowIndex}>
              {columns.map((column:any, colIndex:number) => (
                <td key={colIndex}>
                  {column.key === 'viewDetails' ? (
                    <button onClick={() => handleViewDetails(item)}>View More Details</button>
                  ) : (
                    getColumnValue(item, column.key)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
