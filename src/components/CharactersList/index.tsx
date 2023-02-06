import { Character } from '@/types/character'
import React from 'react'
import CharacterCard from '../CharacterCard'
import GridArticle from '../GridArticle'

interface Props {
  characters: Character[]
}

const CharactersList = ({ characters }: Props) => {
  return (
    <GridArticle>
      {characters.map(c => (
        <CharacterCard character={c} key={c.id} />
      ))}
    </GridArticle>
  )
}

export default CharactersList
