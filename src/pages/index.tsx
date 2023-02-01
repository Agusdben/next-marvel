import AppLayout from '@/components/AppLayout'
import HomeCharacters from '@/components/HomeCharacters'
import { HOME_CHARACTERS_TO_SHOW } from '@/constants/characters'
import { getCharacter } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticProps } from 'next'

interface Props {
  characters: Character[]
}

export default function Home ({ characters }: Props) {
  return (
    <AppLayout headTitle='Home | Next Marvel'>
      <section>
        <h2 className='py-6 text-2xl font-bold'>Popular characters</h2>
        <HomeCharacters characters={characters} />
      </section>
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const promises = HOME_CHARACTERS_TO_SHOW.map(name => getCharacter(name))

  const responses = await Promise.allSettled(promises)

  const characters: Character[] = []

  responses.forEach(res => {
    if (res.status === 'fulfilled') {
      const character = res.value.data.results[0]
      characters.push(character)
    }
  })

  return {
    props: {
      characters
    }
  }
}
