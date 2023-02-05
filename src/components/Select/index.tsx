import React from 'react'

interface Props {
  options: string[]
  name: string
  value: string
  label: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ options, name, onChange, value, label }: Props) => {
  return (
    <div className='flex flex-col gap-1 text-xs text-center text-primary p-2 rounded-md'>
      <label htmlFor={name}>{label}</label>
      <select
        className='text-black'
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(val => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
