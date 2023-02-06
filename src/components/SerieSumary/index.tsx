import { Serie } from '@/types/series'
import React from 'react'
import ListTitled from '../ListTitled'

interface Props {
  serie: Serie
}

const SerieSumary = ({ serie }: Props) => {
  const { characters, creators, stories, events } = serie
  const sumary: { [key: string]: string } = {
    characters: String(characters.available),
    creators: String(creators.available),
    stories: String(stories.available),
    events: String(events.available)
  }
  return <ListTitled obj={sumary} title={serie.title} />
}

export default SerieSumary
