import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  isToggle: boolean
}

const AppMenu = ({ isToggle }: Props) => {
  return (
    <nav
      className={`absolute z-50 top-full left-0 w-full ${
        isToggle
          ? 'max-h-fit overflow-auto border-t-2 border-secondary'
          : 'max-h-0 overflow-hidden'
      }`}
    >
      <ul className='flex flex-col gap-2 text-center text-primary bg-black  py-6'>
        {ROUTES.map(l => (
          <li
            key={l.value}
            className='w-full max-w-lg m-auto hover:line-through hover:bg-secondary transition-colors md:text-3xl'
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
