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
      className='border-2 border-primary hover:bg-primary hover:text-background transition-colors text-primary rounded-md px-6 py-1 w-fit'
    >
      {text}
    </Link>
  )
}

export default ButtonLink
