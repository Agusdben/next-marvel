import { ReactChildren } from '@/types'
import Image from 'next/image'
import React from 'react'
import ButtonLink from '../ButtonLink'

interface Props extends ReactChildren {
  img: string
  alt: string
  href: string
}

const CardContainer = ({ img, alt, href, children }: Props) => {
  return (
    <div className='relative w-[300px] h-full overflow-hidden rounded-md text-white m-auto'>
      <Image
        priority={true}
        className='w-full h-full object-cover object-left absolute top-0 left-0 bottom-0 right-0 m-auto'
        alt={alt}
        src={img}
        width={300}
        height={450}
      />
      <div className='relative z-10 p-2 bg-black bg-opacity-70 h-full flex flex-col'>
        {children}
        <div className='ml-auto p-2'>
          <ButtonLink href={href} text={'Details'} />
        </div>
      </div>
    </div>
  )
}

export default CardContainer
