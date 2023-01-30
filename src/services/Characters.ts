import { ApiCharacter } from '@/types/character'

const { API_URL, API_HASH, API_TS, API_KEY } = process.env

console.log(API_URL)

const CHARACTERS_URL = `${API_URL}/characters`
const CONFIG = `ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`

export const getCharacters = (): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}?${CONFIG}`
  return fetch(URL).then(res => res.json())
}

export const getCharacter = (id: number): Promise<ApiCharacter> => {
  const URL = `${CHARACTERS_URL}/${id}?${CONFIG}`
  return fetch(URL).then(res => res.json())
}
