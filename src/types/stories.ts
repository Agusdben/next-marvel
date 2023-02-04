import {
  ApiData,
  ApiRoot,
  ItemsSumary,
  PeopleSumary,
  ResourceName,
  Thumbnail
} from '.'

export interface Storie {
  id: number
  title: string
  description: string
  resourceURI: string
  type: string
  modified: string
  thumbnail: Thumbnail
  comics: ItemsSumary
  series: ItemsSumary
  events: ItemsSumary
  characters: PeopleSumary
  creators: PeopleSumary
  originalissue: ResourceName
}

export interface Data extends ApiData {
  results: Storie[]
}

export interface ApiStorie extends ApiRoot {
  data: Data
}
