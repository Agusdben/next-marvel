import React, { useState } from 'react'
import AppMenu from '../AppMenu'

const AppHeader = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  const handleToggle = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <header className=' flex bg-black text-primary sticky top-0 left-0 w-full max-w-7xl m-auto z-50'>
      <section className='relative w-full h-full flex justify-between items-center p-6'>
        <h1 className='text-3xl'>Next Marvel</h1>
        <button
          onClick={handleToggle}
          className='flex flex-col justify-between w-7 h-7 [&_div]:w-full [&_div]:h-1 [&_div] [&_div]:bg-white [&_div]:hover:bg-primary'
        >
          <div />
          <div />
          <div />
        </button>
      </section>
      <AppMenu isToggle={toggleMenu} />
    </header>
  )
}

export default AppHeader
