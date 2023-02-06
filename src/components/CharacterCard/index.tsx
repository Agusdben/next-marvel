import { Character } from '@/types/character'
import React from 'react'
import CardContainer from '../CardContainer'
import CharacterSumary from '../CharacterSumary'

interface Props {
  character: Character
}

const CharacterCard = ({ character }: Props) => {
  return (
    <CardContainer
      alt={`Marvel character named ${character.name}`}
      img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      href={`/characters/${character.id}`}
    >
      <CharacterSumary character={character} />
    </CardContainer>
  )
}

export default React.memo(CharacterCard)
