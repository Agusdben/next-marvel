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
      className='border-2 border-primary hover:bg-primary hover:text-secondary transition-colors text-primary rounded-full px-6 py-2 w-fit'
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
