import { Character } from '@/types/character'
import React from 'react'
interface Props {
  character: Character
}
const CharacterSumary = ({ character }: Props) => {
  const { comics, series, stories, events } = character
  const sumary: { [key: string]: number } = {
    comics: comics.available,
    series: series.available,
    stories: stories.available,
    events: events.available
  }
  return (
    <div>
      {Object.entries(sumary).map(([key, value]) => (
        <div key={key} className='p-2'>
          <p>{key}</p>
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default CharacterSumary
