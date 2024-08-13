import classnames from 'classnames';

export default function Select({ label, children, ...rest }){
  const classes = classnames(
    'block py-2 px-4 text-gray-600 bg-gray-50 border border-gray-200 text-sm rounded-sm focus:outline-blue-400 w-full',
    rest.className
  );
  return(
    <select {...rest} className={classes}>
      {children}
    </select>
  )
}
