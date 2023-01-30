import AppLayout from '@/components/AppLayout'
import CharacterCard from '@/components/CharacterCard'
import { CHARACTER_URL_PROPS } from '@/constants/characters'
import { getCharacter, getCharacters } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  character: Character
}

const CharacterPage = ({ character }: Props) => {
  return (
    <AppLayout headTitle={`${character.name} | Next Marvel`}>
      <CharacterCard character={character} />
    </AppLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { results }
  } = await getCharacters(CHARACTER_URL_PROPS)
  const pathsWithParams = results.map(character => ({
    params: { name: String(character.name) }
  }))

  return {
    paths: pathsWithParams,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const name = context.params?.name

  const { data } = await getCharacter(String(name))

  if (!data.results.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      character: data.results[0]
    }
  }
}

export default CharacterPage
