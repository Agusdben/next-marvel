import { Comic } from '@/types/comics'
import React, { useMemo } from 'react'
import Carousel from '../Carousel'

interface Props {
  comics: Comic[]
}

const ComicsSumary = ({ comics }: Props) => {
  const images = useMemo(
    () =>
      comics.map(c => {
        const { thumbnail, title } = c
        const src = thumbnail.path + '.' + thumbnail.extension
        const alt = `Marvel comic ${title}`
        return {
          src,
          alt,
          title
        }
      }),
    [comics]
  )
  return <Carousel images={images} imgWidth={300} />
}

export default ComicsSumary
