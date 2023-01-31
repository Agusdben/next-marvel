import { ApiCharacter, CharacterUriParams } from '@/types/character'

const env = {
  API_HASH: process.env.API_HASH,
  API_TS: process.env.API_TS,
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL
}

console.log(env.API_URL)

const CHARACTERS_URL = `${env.API_URL}/characters`
const CONFIG = `ts=${env.API_TS}&apikey=${env.API_KEY}&hash=${env.API_HASH}`

export const getCharacters = ({
  limit,
  offset,
  orderBy
}: CharacterUriParams): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}?${CONFIG}&offset=${
    offset * limit
  }&limit=${limit}&orderBy=${orderBy}`

  return fetch(URL).then(res => res.json())
}

export const getCharacter = (name: string): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}?${CONFIG}&name=${name}`
  return fetch(URL).then(res => res.json())
}

export const searchCharacter = (
  nameStartsWith: string | string[]
): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}?${CONFIG}&nameStartsWith=${nameStartsWith}`
  return fetch(URL).then(res => res.json())
}
