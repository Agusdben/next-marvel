import { ApiData, ApiRoot, Sumary, Thumbnail, Url } from '.'

export interface TextObject {
  type: string
  language: string
  text: string
}

export interface ResourceName {
  resourceURI: string
  name: string
}

export interface Date {
  type: string
  date: string
}

export interface Price {
  type: string
  price: string
}

export interface ComicPeople extends ResourceName {
  role: string
}

export interface People extends Sumary {
  items: ComicPeople[]
}

export interface ComicStorie {
  resourceURI: string
  name: string
  type: string
}

export interface Stories extends Sumary {
  items: ComicStorie[]
}

export interface ComicEvent {
  resourceURI: string
  name: string
}

export interface Events extends Sumary {
  items: ComicEvent[]
}

export interface Comic {
  id: string
  digitalId: string
  title: string
  issueNumber: string
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: string
  textObjects: TextObject[]
  resourceURI: string
  urls: Url[]
  series: ResourceName
  variants: ResourceName[]
  collections: ResourceName[]
  collectedIssues: ResourceName[]
  dates: Date[]
  prices: Price[]
  thumbnail: Thumbnail
  images: Thumbnail[]
  creators: People
  characters: People
  stories: Stories
  events: Events
}

export interface Data extends ApiData {
  results: Comic[]
}

export interface ApiComic extends ApiRoot {
  data: Data
}
