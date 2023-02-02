import { ApiComic } from '@/types/comics'
import { ENV, AUTH_PARAMS } from '@/utiles/apiConfig'

const COMICS_URL = `${ENV.API_URL}/comics`

export const getOneComic = (id: number): Promise<ApiComic> => {
  const URL = `${COMICS_URL}/${id}?${AUTH_PARAMS}`
  return fetch(URL).then(res => res.json())
}
