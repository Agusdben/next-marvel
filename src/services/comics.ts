import { BasicUrlParams } from '@/types'
import { ApiComic } from '@/types/comics'
import { ENV, AUTH_PARAMS } from '@/utiles/apiConfig'
import { formatObjectToUrlParam } from '@/utiles/index'
const COMICS_URL = `${ENV.API_URL}/comics`

export const getOneComic = (id: number): Promise<ApiComic> => {
  const URL = `${COMICS_URL}/${id}?${AUTH_PARAMS}`
  return fetch(URL).then(res => res.json())
}

export const getComics = (params: BasicUrlParams): Promise<ApiComic> => {
  const { limit, offset } = params
  const calculatedOffset = limit * offset

  const formatedParams = formatObjectToUrlParam({
    ...params,
    offset: calculatedOffset
  })

  const URL = `${COMICS_URL}?${AUTH_PARAMS}&${formatedParams}`

  return fetch(URL).then(res => res.json())
}
