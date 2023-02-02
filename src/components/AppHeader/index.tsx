import React, { useState } from 'react'
import AppMenu from '../AppMenu'

const AppHeader = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  const onClose = () => {
    setToggleMenu(false)
  }

  const onOpen = () => {
    setToggleMenu(true)
  }

  return (
    <header className='p-6 flex justify-between bg-background text-white sticky top-0 left-0 w-full z-50'>
      <h1>Next Marvel</h1>
      <button
        onClick={onOpen}
        className='flex flex-col justify-between w-7 [&_div]:w-full [&_div]:h-1 [&_div] [&_div]:bg-white [&_div]:hover:bg-primary'
      >
        <div />
        <div />
        <div />
      </button>
      {toggleMenu && <AppMenu onClose={onClose} />}
    </header>
  )
}

export default AppHeader
