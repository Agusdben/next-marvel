import React from 'react'
interface Props {
  title: string
}
const SectionHeader = ({ title }: Props) => {
  return (
    <header className='my-5 px-4 py-2 text-2xl rounded-md font-bold bg-background'>
      <h2>{title}</h2>
    </header>
  )
}

export default SectionHeader
