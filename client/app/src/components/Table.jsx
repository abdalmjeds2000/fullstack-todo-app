import React, { Fragment } from 'react';

const Table = ({ config, data, keyFn }) => {
  const renderHeaders = (
    <tr className="border-b-2">
      {config.map((col) => {
        console.log(col);
        if (col.header) {
          return <Fragment key={col.label}>{col?.header}</Fragment>;
        }
        return (
          <th key={col.label} className="p-2 font-semibold">
            {col.label}
          </th>
        );
      })}
    </tr>
  );
  const renderRows = data.map((row) => {
    const renderCells = config.map((cell, ii) => (
      <td key={ii} className="p-3">
        {cell.render(row)}
      </td>
    ));
    return (
      <tr key={keyFn(row)} className="border-b-2">
        {renderCells}
      </tr>
    );
  });

  return (
    <table className='w-full table-fixed'>
      <thead>{renderHeaders}</thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
};

export default Table;
