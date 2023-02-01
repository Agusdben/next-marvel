import Link from 'next/link'
import React from 'react'

const PagesLinks = [
  {
    href: '/',
    value: 'Home'
  },
  {
    href: '/characters',
    value: 'Characters'
  },
  {
    href: '#',
    value: 'Comics'
  },
  {
    href: '#',
    value: 'Series'
  },
  {
    href: '#',
    value: 'Stories'
  },
  {
    href: '#',
    value: 'Events'
  }
]

const AppHeader = () => {
  return (
    <header className='flex gap-2 p-6 bg-background text-white'>
      <nav>
        <ul className='flex'>
          {PagesLinks.map(l => (
            <li
              key={l.value}
              className='px-6 py-2 text-primary hover:line-through'
            >
              <Link href={l.href}>{l.value}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
