import AppLayout from '@/components/AppLayout'
import Carousel from '@/components/Carousel'
import { BASIC_PARAMS } from '@/constants'
import * as characterServices from '@/services/Characters'
import { AvailableContent } from '@/types'
import { Character } from '@/types/character'
import { Comic } from '@/types/comics'
import { Event } from '@/types/events'
import { Serie } from '@/types/series'
import { Storie } from '@/types/stories'
import { extractImgToCarouselFrom } from '@/utiles'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  character: Character
  comics: Comic[]
  events: Event[]
  series: Serie[]
  stories: Storie[]
}

interface LinkToContentSection {
  href: string
  description: string
}

const CharacterPage = ({
  character,
  comics,
  series,
  events,
  stories
}: Props) => {
  const contentSections: AvailableContent[] = [
    { identifier: 'comics', items: comics },
    { identifier: 'events', items: events },
    { identifier: 'series', items: series },
    { identifier: 'stories', items: stories }
  ]

  const linksToContentSection: LinkToContentSection[] = [
    { href: '#comics', description: `Comics (${character.comics.available})` },
    { href: '#events', description: `Events (${character.events.available})` },
    { href: '#series', description: `Series (${character.series.available})` },
    { href: '#stories', description: `Series (${character.stories.available})` }
  ]

  return (
    <AppLayout headTitle={`${character.name} | Next Marvel`}>
      <section className='text-white mb-12 p-6 bg-background rounded-md w-full flex flex-col items-center justify-center gap-4 md:gap-6 md:items-stretch md:flex-row md:justify-start'>
        <Image
          className='w-full h-auto object-cover md:max-w-sm'
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
          <div className='mt-auto flex text-center gap-4'>
            {linksToContentSection.map(({ href, description }) => (
              <Link
                className='hover:text-primary bg-black px-2 py-3 rounded-md'
                key={href}
                href={href}
              >
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
          className='min-h-[300px] flex flex-col gap-4 bg-background rounded-md p-4 mb-12'
        >
          <h2 className='text-3xl capitalize'>
            {identifier} ({character[identifier].available})
          </h2>
          <article className='h-full border-t-2 pt-5 border-secondary'>
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
  } = await characterServices.getCharacters(BASIC_PARAMS)
  const pathsWithParams = results.map(character => ({
    params: { id: String(character.id) }
  }))

  return {
    paths: pathsWithParams,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const id = Number(context.params?.id)

  const { data } = await characterServices.getCharacter(id)

  if (!data.results.length) {
    return {
      notFound: true
    }
  }

  const promises = [
    characterServices.getComicsOfCharacter(id, BASIC_PARAMS),
    characterServices.getEventsOfCharacter(id, BASIC_PARAMS),
    characterServices.getSeriesOfCharacter(id, BASIC_PARAMS),
    characterServices.getStoriesOfCharacter(id, BASIC_PARAMS)
  ]

  const [comicsResponse, eventsResponse, seriesResponse, storiesResponse] =
    await Promise.all(promises)

  return {
    props: {
      character: data.results[0],
      comics: comicsResponse.data.results,
      events: eventsResponse.data.results,
      series: seriesResponse.data.results,
      stories: storiesResponse.data.results
    }
  }
}

export default CharacterPage
