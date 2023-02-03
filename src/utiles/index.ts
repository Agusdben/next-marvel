import { ImgToCarousel } from '@/types'
import { Comic } from '@/types/comics'
import { Event } from '@/types/events'
import { Serie } from '@/types/series'

export function extractImgToCarouselFrom (
  arr: Comic[] | Serie[] | Event[],
  identifier: string
): ImgToCarousel[] {
  return arr.map(item => {
    const { thumbnail, title, id } = item
    const src = thumbnail.path + '.' + thumbnail.extension
    const alt = `Marvel ${identifier} ${title}`
    const url = `/${identifier}/${id}`
    return {
      src,
      alt,
      title,
      url
    }
  })
}
