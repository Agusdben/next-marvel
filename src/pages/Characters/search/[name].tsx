import AppLayout from '@/components/AppLayout'
import CharactersList from '@/components/CharactersList'
import SearchCharacterForm from '@/components/SearchCharacterForm'
import { searchCharacter } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetServerSideProps } from 'next'

interface Props {
  query: string
  characters: Character[]
  totalResults: string
}

const SearchByName = ({ query, characters, totalResults }: Props) => {
  return (
    <AppLayout headTitle={`Results of "${query}" | Next Marvel`}>
      <SearchCharacterForm />
      <section>
        <h2>
          Results of: &quot;{query}&quot; ({totalResults})
        </h2>
        <CharactersList characters={characters} />
      </section>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const name = context.params?.name || ''

  const response = await searchCharacter(name)
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
