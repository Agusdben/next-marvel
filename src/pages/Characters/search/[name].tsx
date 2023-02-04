import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchForm from '@/components/SearchForm'
import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import useSearchMore from '@/hooks/useSearchMore'
import useSearchRoute from '@/hooks/useSearchRoute'
import { searchCharacter } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetServerSideProps } from 'next'
import { useState } from 'react'

interface Props {
  query: string
  chars: Character[]
  totalResults: number
}

const SearchByName = ({ query, chars, totalResults }: Props) => {
  const { handleSearch } = useSearchRoute({ baseRoute: '/characters/search' })
  const [characters, setCharacters] = useState<Character[]>(chars)
  const { hasMore, offset, increaseOffset, setLimitResultsReached } =
    useSearchMore({
      initialHasMore: chars.length < totalResults,
      initialOffset: 0
    })
  const searchMore = async () => {
    if (!hasMore) return

    const nextOffset = offset + 1
    const newCharacters = await searchCharacter(query, {
      ...CHARACTER_URL_PARAMS,
      offset: nextOffset
    })

    if (!newCharacters.data.count) {
      setLimitResultsReached()
      return
    }

    setCharacters(lastCharacters =>
      lastCharacters.concat(newCharacters.data.results)
    )
    increaseOffset()
  }

  return (
    <AppLayout headTitle={`Results of "${query}" | Next Marvel`}>
      <SearchForm onSubmit={handleSearch} />
      <section>
        <header className='my-5 py-2 text-xl font-bold border-b-2 border-black'>
          <h2>
            Results of: &quot;{query}&quot; ({totalResults})
          </h2>
        </header>
        <CharactersList characters={characters} />
      </section>
      {hasMore && (
        <Button type='button' onClick={searchMore} value='Search More' />
      )}
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const name = context.params?.name || ''

  const response = await searchCharacter(name, CHARACTER_URL_PARAMS)
  const characters = response.data.results
  const totalResults = response.data.total
  return {
    props: {
      query: name,
      chars: characters,
      totalResults
    }
  }
}

export default SearchByName
