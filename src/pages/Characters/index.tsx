import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchCharacters from '@/components/SearchCharacters'
import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import useSearchMore from '@/hooks/useSearchMore'
import { getCharacters } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

interface Props {
  char: Character[]
  totalResults: number
}

interface States {
  characters: Character[]
}

const Characters = ({ char, totalResults }: Props) => {
  const [characters, setCharacters] = useState<States['characters']>(char)
  const { offset, hasMore, increaseOffset } = useSearchMore({
    initialOffset: CHARACTER_URL_PARAMS.offset,
    initialHasMore: char.length >= CHARACTER_URL_PARAMS.limit,
    currentTotalResults: characters.length,
    totalResults
  })

  const handleLoadMore = async () => {
    if (!hasMore) return

    const newOffset = offset + 1

    const response = await getCharacters({
      ...CHARACTER_URL_PARAMS,
      offset: newOffset
    })

    const newCharacters = response.data.results

    setCharacters(prevChar => prevChar.concat(newCharacters))

    increaseOffset()
  }

  return (
    <AppLayout
      headTitle={`characters results: ${characters.length} | Next Marvel`}
    >
      <SearchCharacters />
      <CharactersList characters={characters} />
      {hasMore && (
        <div className='m-auto'>
          <Button onClick={handleLoadMore} value='Load more' type='button' />
        </div>
      )}
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await getCharacters(CHARACTER_URL_PARAMS)

  if (response.status !== 'Ok') {
    return {
      notFound: true
    }
  }

  const characters = response.data.results
  return {
    props: {
      char: characters,
      totalResults: response.data.total
    }
  }
}
export default Characters
