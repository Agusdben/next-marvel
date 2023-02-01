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
      className='bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-black rounded-full px-6 py-2 w-fit'
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
