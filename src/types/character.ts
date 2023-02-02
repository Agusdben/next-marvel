import { Url } from 'url'
import { ApiData, ApiRoot, Sumary, Thumbnail } from '.'

export interface CharacterUriParams {
  limit: number
  offset: number
}

export interface ComicItem {
  resourceURI: string
  name: string
}

export interface CharacterComics extends Sumary {
  items: ComicItem[]
}

export interface StoriesItem {
  resourceURI: string
  name: string
  type: string
}

export interface CharacterStories extends Sumary {
  items: StoriesItem[]
}

export interface EventItem {
  resourceURI: string
  name: string
}

export interface CharacterEvents extends Sumary {
  items: EventItem[]
}

export interface SerieItem {
  resourceURI: string
  name: string
}

export interface CharacterSeries extends Sumary {
  items: SerieItem[]
}

export interface Character {
  id: number
  name: string
  description: string | null
  modified: string
  resourceURI: string
  urls: Url[]
  thumbnail: Thumbnail
  comics: CharacterComics
  stories: CharacterStories
  events: CharacterEvents
  series: CharacterSeries
}

export interface CharacterData extends ApiData {
  results: Character[]
}

export interface ApiCharacter extends ApiRoot {
  data: CharacterData
}
