import {
  ApiData,
  ApiRoot,
  ResourceName,
  Thumbnail,
  Url,
  PeopleSumary,
  ItemsSumary
} from '.'

export interface Event {
  id: number
  title: string
  description: string
  resourceURI: string
  urls: Url[]
  modified: string
  start: string
  end: string
  thumbnail: Thumbnail
  comics: ItemsSumary
  stories: PeopleSumary
  series: ItemsSumary
  characters: PeopleSumary
  creators: PeopleSumary
  next: ResourceName
  previous: ResourceName
}

export interface Data extends ApiData {
  results: Event[]
}

export interface ApiEvent extends ApiRoot {
  data: Data
}
