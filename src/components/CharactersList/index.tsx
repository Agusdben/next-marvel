import { Character } from '@/types/character'
import React from 'react'
import CharacterCard from '../CharacterCard'

interface Props {
  characters: Character[]
}

const CharactersList = ({ characters }: Props) => {
  return (
    <div className='grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center'>
      {characters.map(c => (
        <CharacterCard character={c} key={c.id} />
      ))}
    </div>
  )
}

export default CharactersList
