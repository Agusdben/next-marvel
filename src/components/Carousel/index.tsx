import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ArrowRight from '../icons/ArrowRight'
import ArrowLeft from '../icons/ArrowLeft'
import useWindowWidth from '@/hooks/useWindowWidth'

interface Img {
  title?: string
  url?: string
  src: string
  alt: string
}

interface Props {
  images: Img[]
  imgWidth: number
}

const Carousel = ({ images, imgWidth }: Props) => {
  const imgsRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
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
      setScrollPosition(nextScrollPosition)
      return
    }

    imgsRef.current.scroll({ left: imgContainerWidth, behavior: 'smooth' })
    setScrollPosition(imgContainerWidth)
  }

  const handleScrollLeft = () => {
    if (!imgsRef.current) return
    const nextScrollPosition = imgsRef.current.scrollLeft - imgWidth

    if (nextScrollPosition < 0) {
      imgsRef.current.scroll({ left: 0, behavior: 'smooth' })
      setScrollPosition(0)
      return
    }

    imgsRef.current.scroll({ left: nextScrollPosition, behavior: 'smooth' })
    setScrollPosition(nextScrollPosition)
  }

  return (
    <div className='flex relative'>
      {windowWidth < imgContainerWidth && (
        <div className='absolute top-0 left-0 w-full h-full flex justify-between items-center lg:opacity-10 hover:lg:opacity-100 transition-opacity'>
          {scrollPosition !== 0 && (
            <button
              className='px-4 font-bold bg-primary aspect-square rounded-full '
              type='button'
              onClick={handleScrollLeft}
            >
              <ArrowLeft width={30} height={30} />
            </button>
          )}
          {scrollPosition !== imgContainerWidth && (
            <button
              className='px-4 font-bold bg-primary aspect-square rounded-full ml-auto'
              type='button'
              onClick={handleScrollRight}
            >
              <ArrowRight width={30} height={30} />
            </button>
          )}
        </div>
      )}
      <div ref={imgsRef} className='overflow-x-scroll flex no-scrollbar'>
        {images.map(img => {
          return (
            <picture
              key={img.alt}
              className='flex p-2 w-full aspect-[9/16]'
              style={{ minWidth: imgWidth, maxHeight: imgWidth * 1.77 }}
            >
              <Image
                priority={true}
                className='w-full h-full object-cover object-left'
                src={img.src}
                alt={img.alt}
                width={imgWidth}
                height={imgWidth * 1.77} // 9/16
              />
            </picture>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
