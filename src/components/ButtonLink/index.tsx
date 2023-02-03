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
      className='border-2 border-primary hover:bg-primary hover:text-white transition-colors text-primary rounded-full px-6 py-2 w-fit'
    >
      {text}
    </Link>
  )
}

export default ButtonLink
