import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import GridArticle from '@/components/GridArticle'
import SectionHeader from '@/components/SectionHeader'
import SerieCard from '@/components/SerieCard'
import { BASIC_PARAMS } from '@/constants'
import useSearchMore from '@/hooks/useSearchMore'
import { getSeries } from '@/services/series'
import { Serie } from '@/types/series'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

interface Props {
  ser: Serie[]
  totalResults: number
}

const SeriesPage = ({ ser, totalResults }: Props) => {
  const [series, setSeries] = useState<Serie[]>(ser)
  const { offset, hasMore, increaseOffset } = useSearchMore({
    initialOffset: BASIC_PARAMS.offset,
    initialHasMore: series.length >= BASIC_PARAMS.limit,
    currentTotalResults: series.length,
    totalResults
  })

  const handleLoadMore = async () => {
    if (!hasMore) return

    const newOffset = offset + 1

    const response = await getSeries({
      ...BASIC_PARAMS,
      offset: newOffset
    })

    const newSeries = response.data.results

    setSeries(prevSeries => [...prevSeries, ...newSeries])

    increaseOffset()
  }

  return (
    <AppLayout headTitle='Series | Next Marvel'>
      <section>
        <SectionHeader
          title={`All series (${series.length}/${totalResults})`}
        />
        <GridArticle>
          {series.map(c => (
            <SerieCard key={c.id} serie={c} />
          ))}
        </GridArticle>
      </section>
      {hasMore && (
        <div className='m-auto'>
          <Button onClick={handleLoadMore} value='Load more' type='button' />
        </div>
      )}
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await getSeries(BASIC_PARAMS)

  if (response.status !== 'Ok') {
    return {
      notFound: true
    }
  }

  const series = response.data.results

  return {
    props: {
      ser: series,
      totalResults: response.data.total
    }
  }
}

export default SeriesPage
