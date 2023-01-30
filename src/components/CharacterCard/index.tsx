import { Character } from '@/types/character'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CharacterSumary from '../CharacterSumary'

interface Props {
  character: Character
}

const CharacterCard = ({ character }: Props) => {
  return (
    <article className='relative w-[300px] h-[400px] overflow-hidden rounded-md text-white'>
      <Image
        className='w-full h-full object-cover object-left absolute top-0 left-0 -z-10'
        alt={`Marvel character named ${character.name}`}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width={320}
        height={400}
      />
      <div className='p-2 bg-black opacity-70 h-full flex flex-col'>
        <div className='flex flex-col gap-4 items-start flex-1'>
          <p className='font-bold px-2 text-left text-xl'>{character.name}</p>
          <div>
            <CharacterSumary character={character} />
          </div>
        </div>
        <Link
          className='ml-auto border-2 px-4 py-2 rounded-3xl'
          href={`/characters/${character.name}`}
        >
          Details 📝
        </Link>
      </div>
    </article>
  )
}

export default CharacterCard
