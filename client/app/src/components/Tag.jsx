import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
const Tag = ({ children, status, ...rest}) => {
  const classes = classnames(
    'border rounded-sm text-center px-1.5 text-xs', 
    {"border-green-300 bg-green-100 text-green-500": status === 'success'},
    {"border-red-300 bg-red-100 text-red-500": status === 'error'},
    {"border-yellow-300 bg-yellow-100 text-yellow-500": status === 'warnning'},
    {"border-blue-300 bg-blue-100 text-blue-500": status === 'info'},
    {"border-gray-300 bg-gray-100 text-gray-500": status === 'normal'},
    rest?.className
  );

  return (
    <span {...rest} className={classes}>
      {children}
    </span>
  )
}

Tag.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'warnning', 'info', 'normal'])
}

export default Tag