import React, { memo, useCallback } from 'react';
import { useTable } from 'react-table';

 function FakeTable() {
   const data = React.useMemo(
     () => [
       {
         no: 'Hello',
         vin: 'World',
         year: 1992,
         make: 'ford',
         model: 'fake',
       },
       {
         no: 'Hello',
         vin: 'World',
         year: 1992,
         make: 'ford',
         model: 'fake',
       },
       {
         no: 'Hello',
         vin: 'World',
         year: 1992,
         make: 'ford',
         model: 'fake',
       },
     ],
     [],
   );

   const columns = React.useMemo(
     () => [
       {
         Header: 'No',
         accessor: 'no', // accessor is the "key" in the data
       },
       {
         Header: 'VIN',
         accessor: 'vin', // accessor is the "key" in the data
       },
       {
         Header: 'Year',
         accessor: 'year', // accessor is the "key" in the data
       },
       {
         Header: 'Make',
         accessor: 'make', // accessor is the "key" in the data
       },
       {
         Header: 'Model',
         accessor: 'model', // accessor is the "key" in the data
       },
     ],
     [],
   );

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data });

   return (
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row);
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 ))}
             </tr>
           );
         })}
       </tbody>
     </table>
   );
 }
export default FakeTable;
