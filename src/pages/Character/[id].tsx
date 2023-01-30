import { getCharacter, getCharacters } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  character: Character
}

const CharacterPage = ({ character }: Props) => {
  console.log({ character })
  return <div>{character.name}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { results }
  } = await getCharacters()
  const pathsWithParams = results.map(character => ({
    params: { id: String(character.id) }
  }))

  return {
    paths: pathsWithParams,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const characterId = context.params?.id
  const {
    data: { results }
  } = await getCharacter(Number(characterId))
  const character = results[0]

  return {
    props: {
      character
    }
  }
}

export default CharacterPage
