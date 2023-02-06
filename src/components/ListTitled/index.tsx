import React from 'react'

interface Props {
  title: string
  obj: { [key: string]: string }
}

const ListTitled = ({ title, obj }: Props) => {
  return (
    <div className='flex flex-col gap-4 items-start flex-1'>
      <h3 className='font-bold px-2 text-left text-xl'>{title}</h3>
      <ul>
        {Object.entries(obj).map(([key, value]) => (
          <li key={key} className='p-2'>
            <p>{key}</p>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListTitled
