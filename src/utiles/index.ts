import { AvailableContent, ImgToCarousel } from '@/types'
export function extractImgToCarouselFrom (
  arr: AvailableContent['items'],
  identifier: AvailableContent['identifier']
): ImgToCarousel[] {
  return arr.map(item => {
    const { thumbnail, title, id } = item
    const src = thumbnail ? thumbnail.path + '.' + thumbnail.extension : null
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
