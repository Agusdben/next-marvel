import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import ComicCard from '@/components/ComicCard'
import GridArticle from '@/components/GridArticle'
import SectionHeader from '@/components/SectionHeader'
import { BASIC_PARAMS } from '@/constants'
import useSearchMore from '@/hooks/useSearchMore'
import { getComics } from '@/services/comics'
import { Comic } from '@/types/comics'
import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface Props {
  totalResults: number
  com: Comic[]
}

const ComicsPage = ({ totalResults, com }: Props) => {
  const [comics, setComics] = useState<Comic[]>(com)
  const { offset, hasMore, increaseOffset } = useSearchMore({
    initialOffset: BASIC_PARAMS.offset,
    initialHasMore: comics.length >= BASIC_PARAMS.limit,
    currentTotalResults: comics.length,
    totalResults
  })

  const handleLoadMore = async () => {
    if (!hasMore) return

    const newOffset = offset + 1

    const response = await getComics({
      ...BASIC_PARAMS,
      offset: newOffset
    })

    const newComics = response.data.results

    setComics(prevComics => [...prevComics, ...newComics])

    increaseOffset()
  }

  useEffect(() => {
    setComics(com)
  }, [com])

  return (
    <AppLayout headTitle='Comics | Next Marvel'>
      <section>
        <SectionHeader
          title={`All comics (${comics.length}/${totalResults})`}
        />
        <GridArticle>
          {comics.map(c => (
            <ComicCard key={c.id * Math.random()} comic={c} />
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
  const response = await getComics(BASIC_PARAMS)

  if (response.status !== 'Ok') {
    return {
      notFound: true
    }
  }

  const comics = response.data.results
  return {
    props: {
      com: comics,
      totalResults: response.data.total
    }
  }
}

export default ComicsPage
