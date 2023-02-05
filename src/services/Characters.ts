import { AvailableContent, BasicUrlParams } from '@/types'
import { ApiCharacter, CharacterUriParams } from '@/types/character'
import { ApiComic } from '@/types/comics'
import { ApiEvent } from '@/types/events'
import { ApiSerie } from '@/types/series'
import { ApiStorie } from '@/types/stories'
import { formatObjectToUrlParam } from '@/utiles'
import { ENV, AUTH_PARAMS } from '@/utiles/apiConfig'

const CHARACTERS_URL = `${ENV.API_URL}/characters`

export const getCharacters = (
  params: BasicUrlParams
): Promise<ApiCharacter> => {
  const { limit, offset } = params

  const calculatedOffset = offset * limit

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&offset=${calculatedOffset}&limit=${limit}`

  return fetch(URL).then(res => res.json())
}

function getCharacterContent<t> (
  id: number,
  params: BasicUrlParams,
  identifier: AvailableContent['identifier']
): Promise<t> {
  const { limit, offset } = params
  const calculatedOffset = limit * offset
  const paramsUrl = formatObjectToUrlParam({
    ...params,
    offset: calculatedOffset
  })
  const URL = `${CHARACTERS_URL}/${id}/${identifier}?${AUTH_PARAMS}&${paramsUrl}`
  return fetch(URL).then(res => res.json())
}

export const getCharacter = (id: number): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}/${id}?${AUTH_PARAMS}`
  return fetch(URL).then(res => res.json())
}

export const searchCharacter = (
  params: CharacterUriParams
): Promise<ApiCharacter> => {
  const { limit, offset } = params

  const calculatedOffset = limit * offset

  const paramsUrl = formatObjectToUrlParam({
    ...params,
    offset: calculatedOffset
  })

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&${paramsUrl}`

  return fetch(URL).then(res => res.json())
}

export const getComicsOfCharacter = (
  id: number,
  params: BasicUrlParams
): Promise<ApiComic> => {
  return getCharacterContent<ApiComic>(id, params, 'comics')
}

export const getSeriesOfCharacter = (
  id: number,
  params: BasicUrlParams
): Promise<ApiSerie> => {
  return getCharacterContent<ApiSerie>(id, params, 'series')
}

export const getEventsOfCharacter = (
  id: number,
  params: BasicUrlParams
): Promise<ApiEvent> => {
  return getCharacterContent<ApiEvent>(id, params, 'events')
}

export const getStoriesOfCharacter = (
  id: number,
  params: BasicUrlParams
): Promise<ApiStorie> => {
  return getCharacterContent<ApiStorie>(id, params, 'stories')
}
