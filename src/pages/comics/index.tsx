import AppLayout from '@/components/AppLayout'
import ComicCard from '@/components/ComicCard'
import GridArticle from '@/components/GridArticle'
import SectionHeader from '@/components/SectionHeader'
import { BASIC_PARAMS } from '@/constants'
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
  useEffect(() => {
    setComics(com)
  }, [com])

  return (
    <AppLayout headTitle='Comics | Next Marvel'>
      <section>
        <SectionHeader
          title={`All comics (${comics.length}/${totalResults})`}
        />
      </section>
      <section>
        <GridArticle>
          {comics.map(c => (
            <ComicCard key={c.id} comic={c} />
          ))}
        </GridArticle>
      </section>
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
