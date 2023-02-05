import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchCharacters from '@/components/SearchCharacters'
import SectionHeader from '@/components/SectionHeader'
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
    const newCharacters = await searchCharacter({
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
        <SectionHeader
          title={`Results of: "${searchedName}" (${characters.length}/
            ${totalResults})`}
        />
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
  const params = context.query

  const formatedParams: CharacterUriParams = {
    limit: params.limit ? Number(params.limit) : CHARACTER_URL_PARAMS.limit,
    modifiedSince: String(params.modifiedSince) || '',
    offset: 0,
    orderBy: params.orderBy
      ? String(params.orderBy)
      : CHARACTER_URL_PARAMS.orderBy
  }

  if (params.nameStartsWith) {
    formatedParams.nameStartsWith = String(params.nameStartsWith)
  }

  const response = await searchCharacter(formatedParams)

  const characters = response.data.results
  const totalResults = response.data.total
  return {
    props: {
      searchedName: formatedParams.nameStartsWith || '',
      chars: characters,
      totalResults,
      params
    }
  }
}

export default SearchByName
