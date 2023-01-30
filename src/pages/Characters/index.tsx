import AppLayout from '@/components/AppLayout'
import CharacterCard from '@/components/CharacterCard'
import CharacterForm from '@/components/CharacterForm'
import { CHARACTER_URL_PROPS } from '@/constants/characters'
import { getCharacters } from '@/services/Characters'
import { Character, CharacterUriParams } from '@/types/character'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

interface Props {
  characters: Character[]
  params: CharacterUriParams
}

const Characters = ({ characters, params }: Props) => {
  const [state, setState] = useState<Props>({
    characters,
    params
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
        <CharacterForm />
      </section>
      <section className='grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center'>
        {state.characters.map(c => (
          <CharacterCard character={c} key={c.id} />
        ))}
      </section>
      <button disabled={!hasMore} onClick={handleLoadMore}>
        Load more
      </button>
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
