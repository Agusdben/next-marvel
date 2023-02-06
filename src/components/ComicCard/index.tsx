import { Comic } from '@/types/comics'
import React from 'react'
import CardContainer from '../CardContainer'
import ComicSumary from '../ComicSumary'

interface Props {
  comic: Comic
}

const ComicCard = ({ comic }: Props) => {
  return (
    <CardContainer
      alt={`Marvel comic ${comic.title}`}
      img={comic.thumbnail.path + '.' + comic.thumbnail.extension}
      href={`/comics/${comic.id}`}
    >
      <ComicSumary comic={comic} />
    </CardContainer>
  )
}

export default ComicCard
