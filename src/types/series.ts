import {
  ApiData,
  ResourceName,
  Sumary,
  PeopleSumary,
  Thumbnail,
  Url,
  ApiRoot
} from '.'

export interface Comics extends Sumary {
  items: ResourceName[]
}

export interface Storie extends ResourceName {
  type: string
}

export interface Stories extends Sumary {
  items: Storie[]
}

export interface Events extends Sumary {
  items: ResourceName[]
}

export interface Creator extends ResourceName {
  role: string
}

export interface Creators extends Sumary {
  items: Creator[]
}

export interface Serie {
  id: string
  title: string
  description: string
  resourceURI: string
  urls: Url[]
  startYear: string
  endYear: string
  rating: string
  modified: string
  thumbnail: Thumbnail
  comics: Comics
  stories: Stories
  events: Events
  characters: PeopleSumary
  creators: Creators
  next: ResourceName
  previous: ResourceName
}

export interface Data extends ApiData {
  results: Serie[]
}

export interface ApiSerie extends ApiRoot {
  data: Data
}
