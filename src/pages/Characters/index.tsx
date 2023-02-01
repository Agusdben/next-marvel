import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import CharactersList from '@/components/CharactersList'
import SearchForm from '@/components/SearchForm'
import { CHARACTER_URL_PROPS } from '@/constants/characters'
import useSearchRoute from '@/hooks/useSearchRoute'
import { getCharacters } from '@/services/Characters'
import { Character, CharacterUriParams } from '@/types/character'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

interface Props {
  characters: Character[]
}

interface States {
  state: {
    characters: Character[]
    params: CharacterUriParams
  }
}

const Characters = ({ characters }: Props) => {
  const { handleSearch } = useSearchRoute({ baseRoute: '/characters/search' })

  const [state, setState] = useState<States['state']>({
    characters,
    params: CHARACTER_URL_PROPS
  })

  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleLoadMore = async () => {
    if (!hasMore) return

    const { offset } = state.params
    const newOffset = offset + 1

    const response = await getCharacters({ ...state.params, offset: newOffset })

    const newCharacters = response.data.results

    if (!newCharacters.length) {
      setHasMore(false)
    }

    setState(prevState => {
      return {
        ...prevState,
        characters: prevState.characters.concat(newCharacters),
        params: {
          ...prevState.params,
          offset: newOffset
        }
      }
    })
  }

  return (
    <AppLayout
      headTitle={`characters results: ${state.characters.length} | Next Marvel`}
    >
      <section>
        <SearchForm onSubmit={handleSearch} />
      </section>
      <section>
        <CharactersList characters={state.characters} />
      </section>
      <Button
        disabled={!hasMore}
        onClick={handleLoadMore}
        value='Load more'
        type='button'
      ></Button>
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await getCharacters(CHARACTER_URL_PROPS)

  if (response.status !== 'Ok') {
    return {
      notFound: true
    }
  }

  const characters = response.data.results
  return {
    props: {
      characters,
      params: CHARACTER_URL_PROPS
    }
  }
}
export default Characters
