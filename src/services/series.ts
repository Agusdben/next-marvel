import { BasicUrlParams } from '@/types'
import { ApiSerie } from '@/types/series'
import { formatObjectToUrlParam } from '@/utiles'
import { AUTH_PARAMS, ENV } from '@/utiles/apiConfig'

const SERIES_URL = `${ENV.API_URL}/series`

export const getSeries = (params: BasicUrlParams): Promise<ApiSerie> => {
  const { limit, offset } = params

  const calculatedOffset = limit * offset

  const formatedParams = formatObjectToUrlParam({
    ...params,
    offset: calculatedOffset
  })

  const URL = `${SERIES_URL}?${AUTH_PARAMS}&${formatedParams}`

  return fetch(URL).then(res => res.json())
}
