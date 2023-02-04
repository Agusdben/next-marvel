import React from 'react'

interface Props {
  onClick?: () => void
  type: 'button' | 'submit'
  value: string
  disabled?: boolean
}

const Button = ({ onClick, value, type, disabled }: Props) => {
  return (
    <button
      type={type}
      className='border-2 border-primary hover:bg-primary hover:text-background transition-colors text-primary rounded-md px-6 py-1 w-fit'
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
