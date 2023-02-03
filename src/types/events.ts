import {
  ApiData,
  ApiRoot,
  ResourceName,
  Sumary,
  Thumbnail,
  Url,
  PeopleSumary
} from '.'

export interface Comics extends Sumary {
  items: ResourceName[]
}

export interface Series extends Sumary {
  items: ResourceName[]
}

export interface Event {
  id: string
  title: string
  description: string
  resourceURI: string
  urls: Url[]
  modified: string
  start: string
  end: string
  thumbnail: Thumbnail
  comics: Comics
  stories: PeopleSumary
  series: Series
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
