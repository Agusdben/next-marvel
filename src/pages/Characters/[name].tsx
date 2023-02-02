import AppLayout from '@/components/AppLayout'
import CharacterCard from '@/components/CharacterCard'
import { CHARACTER_URL_PROPS } from '@/constants/characters'
import { getCharacter, getCharacters } from '@/services/Characters'
import { Character } from '@/types/character'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  character: Character
}

const CharacterPage = ({ character }: Props) => {
  return (
    <AppLayout headTitle={`${character.name} | Next Marvel`}>
      <section className='text-white pb-14 flex flex-col mx-auto items-center justify-center gap-4 md:gap-6 md:items-stretch md:flex-row md:justify-start md:m-0 '>
        <Image
          className='w-full aspect-square object-cover md:max-w-sm'
          src={character.thumbnail.path + '.' + character.thumbnail.extension}
          alt={`Marvel character ${character.name}`}
          width={300}
          height={300}
        />
        <article className='flex gap-4 flex-col justify-between'>
          <header>
            <h2 className='text-3xl pb-2 text-primary underline underline-offset-4'>
              {character.name}
            </h2>
            <p className='first-letter:ml-5 first-letter:text-xl first-letter:text-primary md:max-w-lg'>
              {character.description || 'No description available'}
            </p>
          </header>
          <div className='mt-auto flex gap-4 hover:[&_a]:text-primary'>
            <Link href='#comics'>Comics ({character.comics.available})</Link>
            <Link href='#series'>Series ({character.series.available})</Link>
            <Link href='#events'>Events ({character.events.available})</Link>
          </div>
        </article>
      </section>

      <section className='h-96' id='comics'>
        <h2>Comics</h2>
      </section>

      <section className='h-96' id='series'>
        <h2>Series</h2>
      </section>

      <section className='h-96' id='events'>
        <h2>Events</h2>
      </section>
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
