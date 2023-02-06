import { Character } from '@/types/character'
import React from 'react'
import ListTitled from '../ListTitled'
interface Props {
  character: Character
}
const CharacterSumary = ({ character }: Props) => {
  const { comics, series, stories, events } = character
  const sumary: { [key: string]: string } = {
    comics: String(comics.available),
    series: String(series.available),
    stories: String(stories.available),
    events: String(events.available)
  }
  return <ListTitled title={character.name} obj={sumary} />
}

export default CharacterSumary
