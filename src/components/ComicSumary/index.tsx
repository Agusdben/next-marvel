import { Comic } from '@/types/comics'
import React from 'react'
import ListTitled from '../ListTitled'

interface Props {
  comic: Comic
}

const ComicSumary = ({ comic }: Props) => {
  const { characters, creators, stories, events } = comic
  const sumary: { [key: string]: string } = {
    characters: String(characters.available),
    creators: String(creators.available),
    stories: String(stories.available),
    events: String(events.available)
  }
  return <ListTitled obj={sumary} title={comic.title} />
}

export default ComicSumary
