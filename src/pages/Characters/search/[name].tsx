import AppLayout from '@/components/AppLayout'
import CharactersList from '@/components/CharactersList'
import SearchForm from '@/components/SearchForm'
import { CHARACTER_URL_PROPS } from '@/constants/characters'
import useSearchRoute from '@/hooks/useSearchRoute'
import { searchCharacter } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetServerSideProps } from 'next'

interface Props {
  query: string
  characters: Character[]
  totalResults: string
}

const SearchByName = ({ query, characters, totalResults }: Props) => {
  const { handleSearch } = useSearchRoute({ baseRoute: '/characters/search' })

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
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const name = context.params?.name || ''

  const response = await searchCharacter(name, CHARACTER_URL_PROPS)
  const characters = response.data.results
  const totalResults = response.data.total
  return {
    props: {
      query: name,
      characters,
      totalResults
    }
  }
}

export default SearchByName
