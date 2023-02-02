import { ApiCharacter, CharacterUriParams } from '@/types/character'
import { ApiComic } from '@/types/comics'
import { ENV, AUTH_PARAMS } from '@/utiles/apiConfig'

const CHARACTERS_URL = `${ENV.API_URL}/characters`

export const getCharacters = (
  params: CharacterUriParams
): Promise<ApiCharacter> => {
  const { limit, offset } = params

  const calculatedOffset = offset * limit

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&offset=${calculatedOffset}&limit=${limit}`

  return fetch(URL).then(res => res.json())
}

export const getCharacter = (
  name: string | string[]
): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&name=${name}`
  return fetch(URL).then(res => res.json())
}

export const searchCharacter = (
  nameStartsWith: string | string[],
  params: CharacterUriParams
): Promise<ApiCharacter> => {
  const { limit, offset } = params

  const calculatedOffset = limit * offset

  const paramsUrl = `offset=${calculatedOffset}&limit=${limit}`

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&nameStartsWith=${nameStartsWith}&${paramsUrl}`

  return fetch(URL).then(res => res.json())
}

export const getComicsOfCharacter = (
  id: number,
  params: CharacterUriParams
): Promise<ApiComic> => {
  const { limit, offset } = params
  const calculatedOffset = limit * offset
  const paramsUrl = `offset=${calculatedOffset}&limit=${limit}`
  const URL = `${CHARACTERS_URL}/${id}/comics?${AUTH_PARAMS}&${paramsUrl}`
  console.log(URL)
  return fetch(URL).then(res => res.json())
}
