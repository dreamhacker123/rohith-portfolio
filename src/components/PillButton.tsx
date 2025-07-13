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
      className={`px-10 z-10 my-4 py-1 border-2 border-[#fff] text-white cursor-pointer rounded-full ${className}`}
      key={key}
    >
      {label}
    </div>
  )
}

export default PillButton
