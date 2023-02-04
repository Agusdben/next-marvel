import {
  ApiData,
  ApiRoot,
  Sumary,
  Thumbnail,
  Url,
  ResourceName,
  ItemsSumary
} from '.'

export interface CharacterUriParams {
  limit: number
  offset: number
}

export interface StoriesItem extends ResourceName {
  type: string
}

export interface CharacterStories extends Sumary {
  items: StoriesItem[]
}

export interface Character {
  id: number
  name: string
  description: string | null
  modified: string
  resourceURI: string
  urls: Url[]
  thumbnail: Thumbnail
  comics: ItemsSumary
  stories: CharacterStories
  events: ItemsSumary
  series: ItemsSumary
}

export interface CharacterData extends ApiData {
  results: Character[]
}

export interface ApiCharacter extends ApiRoot {
  data: CharacterData
}
