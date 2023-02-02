import { Comic } from '@/types/comics'
import Image from 'next/image'
import React from 'react'

interface Props {
  comics: Comic[]
}

const HomeComics = ({ comics }: Props) => {
  return (
    <article className='grid items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {comics.map(c => (
        <div key={c.id} className='w-full h-full'>
          <Image
            className='w-full h-full object-cover max-w-xs m-auto'
            src={c.thumbnail.path + '.' + c.thumbnail.extension}
            alt={`Marvel popular comic ${c.title}`}
            width={300}
            height={300}
          />
        </div>
      ))}
    </article>
  )
}

export default HomeComics
