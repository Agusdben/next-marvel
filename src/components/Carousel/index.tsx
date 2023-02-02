import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ArrowRight from '../icons/ArrowRight'
import ArrowLeft from '../icons/ArrowLeft'

type img = { title?: string; url: string; alt: string }

interface Props {
  images: img[]
  imgWidth: number
}

const Carousel = ({ images, imgWidth }: Props) => {
  const comicsRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [imgContainerWidth, setImageContainerWidth] = useState<number>(0)

  useEffect(() => {
    if (!comicsRef.current) return
    const container = comicsRef.current
    const imgContainerWidth = container.scrollWidth
    setImageContainerWidth(imgContainerWidth)
  }, [])

  const handleScrollRight = () => {
    if (!comicsRef.current) return

    const nextScrollPosition = scrollPosition + imgWidth

    if (nextScrollPosition < imgContainerWidth) {
      comicsRef.current.scroll({ left: nextScrollPosition, behavior: 'smooth' })
      setScrollPosition(nextScrollPosition)
      return
    }

    comicsRef.current.scroll({ left: imgContainerWidth, behavior: 'smooth' })
    setScrollPosition(imgContainerWidth)
  }

  const handleScrollLeft = () => {
    if (!comicsRef.current) return

    const nextScrollPosition = scrollPosition - imgWidth

    if (nextScrollPosition < 0) {
      comicsRef.current.scroll({ left: 0, behavior: 'smooth' })
      setScrollPosition(0)
      return
    }

    comicsRef.current.scroll({ left: nextScrollPosition, behavior: 'smooth' })
    setScrollPosition(nextScrollPosition)
  }

  return (
    <div className='flex relative'>
      <div className='absolute top-0 left-0 w-full h-full flex justify-between items-center lg:opacity-10 hover:lg:opacity-100 transition-opacity'>
        {scrollPosition !== 0 && (
          <button
            className='px-4 font-bold bg-primary/80 aspect-square rounded-full '
            type='button'
            onClick={handleScrollLeft}
          >
            <ArrowLeft width={30} height={30} />
          </button>
        )}
        {scrollPosition !== imgContainerWidth && (
          <button
            className='px-4 font-bold  bg-primary/80 aspect-square rounded-full ml-auto'
            type='button'
            onClick={handleScrollRight}
          >
            <ArrowRight width={30} height={30} />
          </button>
        )}
      </div>
      <div ref={comicsRef} className='overflow-x-scroll flex no-scrollbar'>
        {images.map(img => {
          return (
            <div
              key={img.alt}
              className='flex flex-col gap-2 px-6'
              style={{ minWidth: imgWidth }}
            >
              <Image
                priority={true}
                className='w-full h-full object-cover'
                src={img.url}
                alt={img.alt}
                width={imgWidth}
                height={imgWidth / 1.77} // 19/9
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
