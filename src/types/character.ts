import { ApiData, ApiRoot, Sumary, Thumbnail, Url, ResourceName } from '.'

export interface CharacterUriParams {
  limit: number
  offset: number
}

export interface CharacterComics extends Sumary {
  items: ResourceName[]
}

export interface StoriesItem extends ResourceName {
  type: string
}

export interface CharacterStories extends Sumary {
  items: StoriesItem[]
}

export interface CharacterEvents extends Sumary {
  items: ResourceName[]
}

export interface CharacterSeries extends Sumary {
  items: ResourceName[]
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
