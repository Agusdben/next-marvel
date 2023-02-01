import { Character } from '@/types/character'
import Image from 'next/image'
import React from 'react'
import ButtonLink from '../ButtonLink'
import CharacterSumary from '../CharacterSumary'

interface Props {
  character: Character
}

const CharacterCard = ({ character }: Props) => {
  return (
    <article className='relative w-[300px] h-[400px] overflow-hidden rounded-md text-white m-auto'>
      <Image
        className='w-auto h-full object-cover object-left absolute top-0 left-0'
        alt={`Marvel character named ${character.name}`}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width={320}
        height={400}
      />
      <div className='relative z-10 p-2 bg-black bg-opacity-70 h-full flex flex-col'>
        <div className='flex flex-col gap-4 items-start flex-1'>
          <h3 className='font-bold px-2 text-left text-xl'>{character.name}</h3>
          <CharacterSumary character={character} />
        </div>
        <div className='ml-auto p-2'>
          <ButtonLink
            href={`/characters/${character.name}`}
            text={'Details 📝'}
          />
        </div>
      </div>
    </article>
  )
}

export default React.memo(CharacterCard)
