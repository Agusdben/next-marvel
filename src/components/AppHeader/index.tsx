import Link from 'next/link'
import React from 'react'

const AppHeader = () => {
  return (
    <header className='flex gap-2 p-6'>
      <Link href='/'>Home</Link>
      <Link href='/Characters'>Characters</Link>
    </header>
  )
}

export default AppHeader
