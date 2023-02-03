import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ArrowRight from '../icons/ArrowRight'
import ArrowLeft from '../icons/ArrowLeft'
import useWindowWidth from '@/hooks/useWindowWidth'
import Link from 'next/link'
import { ImgToCarousel } from '@/types'

interface Props {
  images: ImgToCarousel[]
  imgWidth: number
}

const Carousel = ({ images, imgWidth }: Props) => {
  const imgsRef = useRef<HTMLDivElement>(null)
  const [imgContainerWidth, setImageContainerWidth] = useState<number>(0)
  const { windowWidth } = useWindowWidth()

  useEffect(() => {
    if (!imgsRef.current) return
    const container = imgsRef.current
    const imgContainerWidth = container.scrollWidth
    setImageContainerWidth(imgContainerWidth)
  }, [])

  const handleScrollRight = () => {
    if (!imgsRef.current) return
    const nextScrollPosition = imgsRef.current.scrollLeft + imgWidth

    if (nextScrollPosition < imgContainerWidth) {
      imgsRef.current.scroll({ left: nextScrollPosition, behavior: 'smooth' })
      return
    }

    imgsRef.current.scroll({ left: imgContainerWidth, behavior: 'smooth' })
  }

  const handleScrollLeft = () => {
    if (!imgsRef.current) return
    const nextScrollPosition = imgsRef.current.scrollLeft - imgWidth

    if (nextScrollPosition < 0) {
      imgsRef.current.scroll({ left: 0, behavior: 'smooth' })
      return
    }

    imgsRef.current.scroll({ left: nextScrollPosition, behavior: 'smooth' })
  }

  return (
    <div className='flex flex-col gap-4'>
      <div ref={imgsRef} className='overflow-x-scroll flex no-scrollbar'>
        {images.map(img => {
          return (
            <div
              key={img.alt}
              className='relative aspect-[9/16] bg-secondary'
              style={{ minWidth: imgWidth, maxHeight: imgWidth * 1.77 }}
            >
              <Image
                priority={true}
                className='w-full h-full object-cover object-center '
                src={img.src}
                alt={img.alt}
                width={imgWidth}
                height={imgWidth * 1.77} // 9/16
              />
              <div className='absolute w-full flex flex-col bottom-0 left-0 p-2 text-left bg-black'>
                <Link className='' href={img.url}>
                  <span>{img.title} 🔍</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      {windowWidth < imgContainerWidth && (
        <div className='flex justify-end gap-4'>
          <button
            className='px-4 font-bold bg-primary py-2 rounded-sm hover:brightness-125 '
            type='button'
            onClick={handleScrollLeft}
          >
            <ArrowLeft width={30} height={30} />
          </button>
          <button
            className='px-4 font-bold bg-primary py-2 rounded-sm hover:brightness-125'
            type='button'
            onClick={handleScrollRight}
          >
            <ArrowRight width={30} height={30} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Carousel
