import { Serie } from '@/types/series'
import React from 'react'
import CardContainer from '../CardContainer'
import SerieSumary from '../SerieSumary'

interface Props {
  serie: Serie
}

const SerieCard = ({ serie }: Props) => {
  return (
    <CardContainer
      alt={`Marvel serie ${serie.title}`}
      img={serie.thumbnail.path + '.' + serie.thumbnail.extension}
      href={`/series/${serie.id}`}
    >
      <SerieSumary serie={serie} />
    </CardContainer>
  )
}

export default React.memo(SerieCard)
