import AppLayout from '@/components/AppLayout'
import Carousel from '@/components/Carousel'
import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import * as characterServices from '@/services/Characters'
import { Character } from '@/types/character'
import { Comic } from '@/types/comics'
import { Event } from '@/types/events'
import { Serie } from '@/types/series'
import { extractImgToCarouselFrom } from '@/utiles'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  character: Character
  comics: Comic[]
  series: Serie[]
  events: Event[]
}

interface ContentSection {
  identifier: 'comics' | 'series' | 'events'
  items: Comic[] | Serie[] | Event[]
}

interface LinkToContentSection {
  href: string
  description: string
}

const CharacterPage = ({ character, comics, series, events }: Props) => {
  const contentSections: ContentSection[] = [
    { identifier: 'comics', items: comics },
    { identifier: 'series', items: series },
    { identifier: 'events', items: events }
  ]

  const linksTocontentSection: LinkToContentSection[] = [
    { href: '#comics', description: `Comics (${character.comics.available})` },
    { href: '#serie', description: `Series (${character.series.available})` },
    { href: '#events', description: `Comics (${character.events.available})` }
  ]

  return (
    <AppLayout headTitle={`${character.name} | Next Marvel`}>
      <section className='text-white pb-20 flex flex-col mx-auto items-center justify-center gap-4 md:gap-6 md:items-stretch md:flex-row md:justify-start md:m-0 '>
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
          </header>
          <p className='first-letter:ml-5 first-letter:text-xl first-letter:text-primary md:max-w-lg'>
            {character.description || 'No description available'}
          </p>
          <div className='mt-auto flex gap-4 '>
            {linksTocontentSection.map(({ href, description }) => (
              <Link className='hover:text-primary' key={href} href={href}>
                {description}
              </Link>
            ))}
          </div>
        </article>
      </section>

      {contentSections.map(({ identifier, items }) => (
        <section
          id={identifier}
          key={identifier}
          className='min-h-[300px] flex flex-col gap-4'
        >
          <h2 className='text-3xl capitalize'>
            {identifier} {character[identifier].available}
          </h2>
          <article className='h-full border-t-2 pt-5 border-primary'>
            <Carousel
              images={extractImgToCarouselFrom(items, identifier)}
              imgWidth={300}
            />
          </article>
        </section>
      ))}
    </AppLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { results }
  } = await characterServices.getCharacters(CHARACTER_URL_PARAMS)
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

  const { data } = await characterServices.getCharacter(String(name))

  if (!data.results.length) {
    return {
      notFound: true
    }
  }
  const idCharacter = data.results[0].id

  const comicsResponse = await characterServices.getComicsOfCharacter(
    idCharacter,
    CHARACTER_URL_PARAMS
  )

  const seriesResponse = await characterServices.getSeriesOfCharacter(
    idCharacter,
    CHARACTER_URL_PARAMS
  )

  const eventsResponse = await characterServices.getEventsOfCharacter(
    idCharacter,
    CHARACTER_URL_PARAMS
  )

  return {
    props: {
      character: data.results[0],
      comics: comicsResponse.data.results,
      series: seriesResponse.data.results,
      events: eventsResponse.data.results
    }
  }
}

export default CharacterPage
