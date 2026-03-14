import React from "react"

type PillButtonProps = {
  label: string
  onClick?: () => void
  className?: string
  key?: React.Key | null | undefined
}

const PillButton: React.FC<PillButtonProps> = ({ label, onClick, className='', key }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`px-10 z-10 my-4 py-3 bg-gradient-to-r from-black to-gray-900 border-2 border-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold cursor-pointer rounded-full shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${className}`}
      key={key}
    >
      {label}
    </div>
  )
}

export default PillButton
