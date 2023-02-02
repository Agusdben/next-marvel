import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  onClose: () => void
}

const AppMenu = ({ onClose }: Props) => {
  return (
    <nav className='fixed top-0 left-0 h-screen w-full bg-black p-6'>
      <ul className='flex flex-col gap-2 text-center text-primary'>
        <li className='ml-auto text-3xl p-2'>
          <button onClick={onClose}>&#215;</button>
        </li>
        {ROUTES.map(l => (
          <li
            key={l.value}
            className='w-full max-w-lg m-auto  hover:line-through hover:bg-secondary transition-colors md:text-3xl'
          >
            <Link className='block px-6 py-2 ' href={l.href}>
              {l.value}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AppMenu
