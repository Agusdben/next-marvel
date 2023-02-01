import Link from 'next/link'
import React from 'react'

interface Props {
  text: string
  href: string
}

const ButtonLink = ({ text, href }: Props) => {
  return (
    <Link
      href={href}
      className='bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-full px-6 py-2 w-fit'
    >
      {text}
    </Link>
  )
}

export default ButtonLink
