import React, { useState } from 'react';
import Table from './Table';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const SortableTable = (props) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data } = props;

  const handleClick = (label) => {
    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const updateConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: (
        <th className='flex items-center p-2 font-semibold cursor-pointer' onClick={() => handleClick(column.label)}>
          {getIcon(column.label, sortBy, sortOrder)}
          {column.label}
        </th>
      ),
    };
  });

  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const aVal = sortValue(a);
      const bVal = sortValue(b);
      const reverseOrder = sortOrder === 'asc' ? 1 : -1;
      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal) * reverseOrder;
      }
      return (aVal - bVal) * reverseOrder;
    });
  }
  return <Table {...props} data={sortedData} config={updateConfig} />;
};

export default SortableTable;

const getIcon = (label, sortBy, sortOrder) => {
  if (label !== sortBy) {
    return <><IoMdArrowDropdown /><IoMdArrowDropup /></>;
  }
  if (sortOrder === null) {
    return <><IoMdArrowDropdown /><IoMdArrowDropup /></>;
  } else if (sortOrder === 'asc') {
    return <IoMdArrowDropdown />;
  } else if (sortOrder === 'desc') {
    return <IoMdArrowDropup />;
  }
};
