import { Character } from '@/types/character'
import Image from 'next/image'
import React from 'react'
import ButtonLink from '../ButtonLink'

interface Props {
  characters: Character[]
}

const HomeCharacters = ({ characters }: Props) => {
  return (
    <article className='flex flex-col gap-3 w-full items-center md:flex-row md:justify-between'>
      {characters.map(c => (
        <div
          key={c.name}
          className='relative w-full overflow-hidden [&_a]:hidden [&_a]:hover:block h-20 hover:h-96 hover:transition-transform md:h-96 md:hover:scale-105'
        >
          <div className='p-2 relative z-10 h-full text-white bg-black bg-opacity-70 flex flex-col justify-between items-center hover:bg-opacity-0'>
            <p className='text-2xl text-left mr-auto'>{c.name}</p>
            <ButtonLink text='More info' href={`/characters/${c.id}`} />
          </div>
          <Image
            className='absolute top-0 left-0 h-full w-full object-cover object-center'
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
