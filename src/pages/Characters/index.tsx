import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchForm from '@/components/SearchForm'
import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import useSearchMore from '@/hooks/useSearchMore'
import useSearchRoute from '@/hooks/useSearchRoute'
import { getCharacters } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

interface Props {
  char: Character[]
}

interface States {
  characters: Character[]
}

const Characters = ({ char }: Props) => {
  const { handleSearch } = useSearchRoute({ baseRoute: '/characters/search' })
  const { offset, hasMore, setLimitResultsReached, increaseOffset } =
    useSearchMore({
      initialOffset: CHARACTER_URL_PARAMS.offset,
      initialHasMore: char.length >= CHARACTER_URL_PARAMS.limit
    })
  const [characters, setCharacters] = useState<States['characters']>(char)

  const handleLoadMore = async () => {
    if (!hasMore) return

    const newOffset = offset + 1

    const response = await getCharacters({
      ...CHARACTER_URL_PARAMS,
      offset: newOffset
    })

    const newCharacters = response.data.results

    if (!newCharacters.length) setLimitResultsReached()

    setCharacters(prevChar => prevChar.concat(newCharacters))

    increaseOffset()
  }

  return (
    <AppLayout
      headTitle={`characters results: ${characters.length} | Next Marvel`}
    >
      <SearchForm onSubmit={handleSearch} />
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
      char: characters
    }
  }
}
export default Characters
