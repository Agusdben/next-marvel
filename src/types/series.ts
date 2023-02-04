import {
  ApiData,
  ResourceName,
  Sumary,
  PeopleSumary,
  Thumbnail,
  Url,
  ApiRoot,
  ItemsSumary
} from '.'

interface Creator extends ResourceName {
  role: string
}

interface Creators extends Sumary {
  items: Creator[]
}

export interface Serie {
  id: number
  title: string
  description: string
  resourceURI: string
  urls: Url[]
  startYear: string
  endYear: string
  rating: string
  modified: string
  thumbnail: Thumbnail
  comics: ItemsSumary
  stories: ItemsSumary
  events: ItemsSumary
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
