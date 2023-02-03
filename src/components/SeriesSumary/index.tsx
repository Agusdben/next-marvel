import { Serie } from '@/types/series'
import React, { useMemo } from 'react'
import Carousel from '../Carousel'
interface Props {
  series: Serie[]
}
const SeriesSumary = ({ series }: Props) => {
  const images = useMemo(
    () =>
      series
        .map(s => {
          const { thumbnail, title } = s
          const src = thumbnail.path + '.' + thumbnail.extension
          const alt = `Marvel serie ${title}`
          return {
            src,
            alt,
            title
          }
        })
        .slice(0, 1),
    [series]
  )
  return <Carousel images={images} imgWidth={300} />
}

export default SeriesSumary
