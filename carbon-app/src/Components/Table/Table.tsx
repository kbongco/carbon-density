import React, { useEffect, useState } from "react";
import './Table.scss';
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Table({ data, columns, handleViewDetails }: any) {
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<boolean>(false); // false for ascending, true for descending

  useEffect(() => {
    setSortedData(data);
  }, [data]);

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


    const column = columns.find((col: any) => col.key === key);
    if (value && typeof value !== 'object' && column && column.render) {
      return column.render(value);
    }
  
    return value;
  };

  const sortData = () => {
    const sorted = [...sortedData].sort((a, b) => {
      if (!sortDirection) {
        return a.intensity.forecast - b.intensity.forecast;
      } else {
        return b.intensity.forecast - a.intensity.forecast;
      }
    });
    setSortedData(sorted);
    setSortDirection(!sortDirection); // Toggle sort direction
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column: any, colIndex: number) => (
              <th key={colIndex}>
                {column?.label}
                {column?.key === 'intensity.forecast' && (
                  <button onClick={sortData}>
                    <FontAwesomeIcon icon={faSortDown} />
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((item:any, rowIndex:any) => (
            <tr key={rowIndex}>
              {columns?.map((column:any, colIndex:number) => (
                <td key={colIndex}>
                  {column?.key === 'viewDetails' ? (
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
  );
}


// import React, { useEffect, useState } from "react";
// import './Table.scss';
// import { faSortDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function Table({ data, columns, handleViewDetails }: any) {
//   console.log(data, 'yes');
//   const [sortedData, setSortedData] = useState<any[]>([]);

//   useEffect(() => {
//     setSortedData(data);
//   }, [data]);

//   const getColumnValue = (row: any, key: string) => {
//     const keys = key.split('.'); 
//     let value = row;
  
//     for (const k of keys) {
//       if (value && typeof value === 'object' && k in value) {
//         value = value[k];
//       } else {
//         value = undefined;
//         break;
//       }
//     }


//     const column = columns.find((col: any) => col.key === key);
//     if (value && typeof value !== 'object' && column && column.render) {
//       return column.render(value);
//     }
  
//     return value;
//   };

    
//   const sortData = () => {

//     const sorted = [...data].sort((a, b) => a.intensity.forecast - b.intensity.forecast);
//     setSortedData(sorted);
//   };

//   return (
//     <div className="table-container">
//     <div className="table-container">
//       <table>
//         <thead>
//           <tr>

//                           {columns.map((column: any, colIndex: number) => (
//               <th key={colIndex}>
//                 {column.label}
//                 {column.key === 'intensity.forecast' && (
//                   <button onClick={sortData}>
//                     <FontAwesomeIcon icon={faSortDown} />
//                   </button>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData?.map((item:any, rowIndex:any) => (
//             <tr key={rowIndex}>
//               {columns.map((column:any, colIndex:number) => (
//                 <td key={colIndex}>
//                   {column.key === 'viewDetails' ? (
//                     <button onClick={() => handleViewDetails(item)}>View More Details</button>
//                   ) : (
//                     getColumnValue(item, column.key)
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// }
