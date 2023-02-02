import { ApiCharacter, CharacterUriParams } from '@/types/character'
import { ENV, AUTH_PARAMS } from '@/utiles/apiConfig'

const CHARACTERS_URL = `${ENV.API_URL}/characters`

export const getCharacters = (
  params: CharacterUriParams
): Promise<ApiCharacter> => {
  const { limit, offset, orderBy } = params

  const calculatedOffset = offset * limit

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&offset=${calculatedOffset}&limit=${limit}&orderBy=${orderBy}`

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
  const { limit, offset, orderBy } = params

  const calculatedOffset = limit * offset

  const paramsUrl = `offset=${calculatedOffset}&limit=${limit}&orderBy=${orderBy}`

  const URL = `${CHARACTERS_URL}?${AUTH_PARAMS}&nameStartsWith=${nameStartsWith}&${paramsUrl}`

  return fetch(URL).then(res => res.json())
}
