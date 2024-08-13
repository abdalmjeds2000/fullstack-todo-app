import React from 'react'

const Checkbox = ({ label, id, value, onChange }) => {
  return (
    <div className='flex items-center'>
      <input id={id} type="checkbox" value={value} onChange={onChange} className="w-3.5 h-3.5 text-blue-600 bg-gray-50 border-gray-300 rounded" />
      <label htmlFor={id} className="ml-2 text-sm text-gray-900">{label}</label>
    </div>
  )
}

export default Checkbox