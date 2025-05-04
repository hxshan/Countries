import React from 'react'

const InfoFeild = ({ icon, label, value }) => {
  return (
    <div className="flex items-center py-2 border-b border-gray-100 dark:border-gray-800">
    <div className="mr-3">
      {icon}
    </div>
    <div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-gray-800 dark:text-gray-200">{value}</div>
    </div>
  </div>
  )
}

export default InfoFeild