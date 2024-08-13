import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) => {

  const classes = classnames(
    'inline-flex flex items-center justify-center gap-1 whitespace-nowrap transition-all active:top-0.5 hover:opacity-90 active:opacity-70 active:scale-95', 
    {"rounded-full p-3": rounded},
    {"rounded-sm px-3 py-2": !rounded},
    {"bg-blue-500 focus:outline-blue-600": primary && !outline},
    {"bg-gray-400 focus:outline-gray-600": secondary && !outline},
    {"bg-green-500 focus:outline-green-600": success && !outline},
    {"bg-yellow-500 focus:outline-yellow-600": warning && !outline},
    {"bg-red-500 focus:outline-red-600": danger && !outline},
    {"bg-white": outline},
    {"text-white": !outline},
    {"border border-blue-500 text-blue-500 focus:outline-blue-200": outline && primary},
    {"border border-gray-400 text-gray-500 focus:outline-gray-200": outline && secondary},
    {"border border-green-500 text-green-500 focus:outline-green-200": outline && success},
    {"border border-yellow-500 text-yellow-500 focus:outline-yellow-200": outline && warning},
    {"border border-red-500 text-red-500 focus:outline-red-200": outline && danger},
    rest.className
  );
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count = Number(!!primary) 
      + Number(!!secondary) 
      + Number(!!success) 
      + Number(!!warning) 
      + Number(!!danger);
    if(count > 1) {
      return new Error('Only one of primary, secondary, success, warning, danger can be true.')
    }
  }
}

export default Button