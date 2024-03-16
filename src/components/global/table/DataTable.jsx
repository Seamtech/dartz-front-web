import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './DataTable.css'; // Your custom CSS

// Added a new prop `layoutType` to switch between layouts
const DataTable = ({ columns, data, hideColumnsOnMobile, layoutType = 'table' }) => {
  const isColumnHiddenOnMobile = (fieldName) => hideColumnsOnMobile.includes(fieldName);

  // Card Layout Renderer
  const renderCardLayout = () => (
    <div className="card-layout">
      {data.map((item, index) => (
        <div key={index} className="card">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className={isColumnHiddenOnMobile(column.field) ? 'column-hidden' : 'card-row'}>
              <div className='card-row-header'>{column.headerName}:</div> 
              < div className = 'card-row-data'>{column.renderCell ? column.renderCell(item) : item[column.field]}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  // Table Layout Renderer
  const renderTableLayout = () => (
    <Table className="DataTable">
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index} className={isColumnHiddenOnMobile(column.field) ? 'column-hidden' : ''}>
              {column.headerName}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <Td key={columnIndex} className={isColumnHiddenOnMobile(column.field) ? 'column-hidden' : ''}>
                {column.renderCell ? column.renderCell(row) : row[column.field]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <div className="table-responsive">
      {layoutType === 'card' ? renderCardLayout() : renderTableLayout()}
    </div>
  );
};

export default DataTable;
