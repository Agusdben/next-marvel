import { Character } from '@/types/character'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  characters: Character[]
}

const HomeCharacters = ({ characters }: Props) => {
  return (
    <article className='flex flex-col gap-2 w-full items-center md:flex-row md:justify-between'>
      {characters.map(c => (
        <div
          key={c.name}
          className='p-2 relative bg-black bg-opacity-70 text-white font-bold flex flex-col justify-between [&_a]:hidden [&_a]:hover:block h-20 w-full overflow-hidden hover:h-96 hover:transition-all md:h-96 md:hover:scale-110'
        >
          <p className='text-2xl  text-left mr-auto'>{c.name}</p>
          <Link
            className='ml-auto rounded-full border-2 px-4'
            href={`/characters/${c.name}`}
          >
            More info
          </Link>
          <Image
            className='absolute top-0 left-0 -z-10 h-full w-full object-cover object-center'
            src={c.thumbnail.path + '.' + c.thumbnail.extension}
            alt={`Marvel character ${c.name}`}
            width={300}
            height={650}
          />
        </div>
      ))}
    </article>
  )
}

export default HomeCharacters
