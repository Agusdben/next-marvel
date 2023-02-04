import { Character } from '@/types/character'
import React from 'react'
import CharacterCard from '../CharacterCard'

interface Props {
  characters: Character[]
}

const CharactersList = ({ characters }: Props) => {
  return (
    <section className='mb-12 bg-background rounded-md grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-2 xl:grid-cols-4 content-center'>
      {characters.map(c => (
        <CharacterCard character={c} key={c.id} />
      ))}
    </section>
  )
}

export default CharactersList
