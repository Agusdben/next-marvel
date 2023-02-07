import { Character } from '@/types/character'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'

interface Props {
  characters: Character[]
}

const HomeCharacters = ({ characters }: Props) => {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState<number>(0)
  const [currentCharacter, setCurrentCharacter] = useState<Character>(
    characters[currentCharacterIndex]
  )

  useEffect(() => {
    setCurrentCharacter(characters[currentCharacterIndex])
  }, [currentCharacterIndex, characters])

  const manualChangeIndex = (index: number) => {
    setCurrentCharacterIndex(index)
  }

  const handleNext = useCallback(() => {
    if (currentCharacterIndex === characters.length - 1) {
      setCurrentCharacterIndex(0)
      return
    }
    setCurrentCharacterIndex(currentIndex => currentIndex + 1)
  }, [characters.length, currentCharacterIndex])

  const handlePrev = () => {
    if (currentCharacterIndex === 0) {
      setCurrentCharacterIndex(characters.length - 1)
      return
    }
    setCurrentCharacterIndex(currentIndex => currentIndex - 1)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 10000)

    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <article className='relative flex flex-col gap-3 w-full items-center md:justify-between'>
      <Image
        className='aspect-square opacity-0 object-cover animate-smoothOpacity'
        width={560}
        height={560}
        src={`${currentCharacter.thumbnail.path}.${currentCharacter.thumbnail.extension}`}
        alt={`Marvel character ${currentCharacter.name}`}
      />
      <div className='flex gap-1'>
        {characters.map((c, index) => (
          <button
            type='button'
            onClick={() => manualChangeIndex(index)}
            key={c.id}
            className={`aspect-square w-3 rounded-full ${
              index === currentCharacterIndex
                ? 'bg-primary'
                : 'border-2 border-primary'
            }`}
          />
        ))}
      </div>
      <button
        className='absolute top-1/2 -translate-y-1/2 left-0 aspect-square border-primary border-2 rounded-full p-1'
        onClick={handlePrev}
      >
        <ArrowLeft height={20} width={20} fill={'#fff'} />
      </button>
      <button
        className='absolute top-1/2 -translate-y-1/2 right-0 aspect-square border-primary border-2 rounded-full p-1'
        onClick={handleNext}
      >
        <ArrowRight height={20} width={20} fill={'#fff'} />
      </button>
    </article>
  )
}

export default HomeCharacters
