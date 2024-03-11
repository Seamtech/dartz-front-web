import React from 'react';
import './DataTable.css'; // Make sure your CSS includes responsive design rules

const DataTable = ({ columns, data, hideColumnsOnMobile }) => {
  // Function to determine if the column should be hidden on mobile
  const isColumnHiddenOnMobile = (fieldName) => {
    return hideColumnsOnMobile.includes(fieldName);
  };

  return (
    <div className="table-responsive">
      <table className="DataTable">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={isColumnHiddenOnMobile(column.field) ? 'detail-column' : ''}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className={isColumnHiddenOnMobile(column.field) ? 'detail-column' : ''}>
                  {column.renderCell ? column.renderCell(row) : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
