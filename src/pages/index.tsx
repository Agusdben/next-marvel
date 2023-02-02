import AppLayout from '@/components/AppLayout'
import HomeCharacters from '@/components/HomeCharacters'
import HomeComics from '@/components/HomeComics'
import { HOME_CHARACTERS_TO_SHOW } from '@/constants/characters'
import { HOME_COMICS_TO_SHOW } from '@/constants/comics'
import { getCharacter } from '@/services/Characters'
import { getOneComic } from '@/services/comics'
import { Character } from '@/types/character'
import { Comic } from '@/types/comics'
import { GetStaticProps } from 'next'

interface Props {
  characters: Character[]
  comics: Comic[]
}

export default function Home ({ characters, comics }: Props) {
  return (
    <AppLayout headTitle='Home | Next Marvel'>
      <section>
        <h2 className='py-6 text-2xl font-bold'>Popular characters</h2>
        <HomeCharacters characters={characters} />
      </section>
      <section>
        <h2 className='py-6 text-2xl font-bold'>Best comics</h2>
        <HomeComics comics={comics} />
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

  const comicsPromises = HOME_COMICS_TO_SHOW.map(id => getOneComic(id))
  const comicsResponses = await Promise.allSettled(comicsPromises)
  const comics: Comic[] = []
  comicsResponses.forEach(res => {
    if (res.status === 'fulfilled') {
      const comic = res.value.data.results[0]
      comics.push(comic)
    }
  })

  return {
    props: {
      characters,
      comics
    }
  }
}
