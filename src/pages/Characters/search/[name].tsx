import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchCharacters from '@/components/SearchCharacters'
import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import useSearchMore from '@/hooks/useSearchMore'
import { searchCharacter } from '@/services/Characters'
import { Character, CharacterUriParams } from '@/types/character'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

interface Props {
  searchedName: string
  chars: Character[]
  totalResults: number
  params: CharacterUriParams
}

const SearchByName = ({ searchedName, chars, totalResults, params }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const { hasMore, offset, increaseOffset, reset } = useSearchMore({
    initialHasMore: totalResults > characters.length,
    initialOffset: params.offset,
    currentTotalResults: characters.length,
    totalResults
  })

  useEffect(() => {
    setCharacters(chars)
  }, [chars])

  useEffect(() => {
    reset()
  }, [reset, searchedName])

  const searchMore = async () => {
    if (!hasMore) return

    const nextOffset = offset + 1
    const newCharacters = await searchCharacter(searchedName, {
      ...params,
      offset: nextOffset
    })

    setCharacters(lastCharacters =>
      lastCharacters.concat(newCharacters.data.results)
    )

    increaseOffset()
  }

  return (
    <AppLayout headTitle={`Results of "${searchedName}" | Next Marvel`}>
      <SearchCharacters />
      <section>
        <header className='my-5 py-2 text-xl font-bold border-b-2 border-black'>
          <h2>
            Results of: &quot;{searchedName}&quot; ({characters.length}/
            {totalResults})
          </h2>
        </header>
        <CharactersList characters={characters} />
      </section>
      <section className='m-auto'>
        {hasMore && (
          <Button type='button' onClick={searchMore} value='Search More' />
        )}
      </section>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { name = '', ...restParams } = context.query

  const params: CharacterUriParams = {
    limit: restParams.limit
      ? Number(restParams.limit)
      : CHARACTER_URL_PARAMS.limit,
    modifiedSince: String(restParams.modifiedSince) || '',
    offset: 0,
    orderBy: restParams.orderBy
      ? String(restParams.orderBy)
      : CHARACTER_URL_PARAMS.orderBy
  }

  const response = await searchCharacter(name, params)
  const characters = response.data.results
  const totalResults = response.data.total
  return {
    props: {
      searchedName: name,
      chars: characters,
      totalResults,
      params
    }
  }
}

export default SearchByName
