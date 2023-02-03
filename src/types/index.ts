import React from 'react'

export interface ReactChildren {
  children: React.ReactNode
}
export interface Url {
  type: string
  url: string
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
  offset: string
  limit: string
  total: string
  count: string
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
