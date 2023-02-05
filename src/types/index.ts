import React from 'react'
import { Comic } from './comics'
import { Event } from './events'
import { Serie } from './series'
import { Storie } from './stories'

export interface ReactChildren {
  children: React.ReactNode
}

export interface Url {
  type: string
  url: string
}

export interface BasicUrlParams {
  offset: number
  limit: number
}

export interface ImgToCarousel {
  title: string
  url: string
  src: string | null
  alt: string
}

export interface ResourceName {
  resourceURI: string
  name: string
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface ApiData {
  offset: number
  limit: number
  total: number
  count: number
}

export interface ApiRoot {
  code: string
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
}

export interface Sumary {
  available: number
  returned: number
  collectionURI: string
}

export interface ItemsSumary extends Sumary {
  items: ResourceName[]
}

export interface People extends ResourceName {
  role: string
}

export interface PeopleSumary extends Sumary {
  items: People[]
}

export interface SvgProps {
  width: number
  height: number
  fill?: string
}

export interface AvailableContent {
  identifier: 'comics' | 'series' | 'events' | 'stories'
  items: Comic[] | Serie[] | Event[] | Storie[]
}
