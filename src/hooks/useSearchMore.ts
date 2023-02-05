import { useEffect, useState } from 'react'

interface Props {
  initialOffset: number
  initialHasMore: boolean
  totalResults: number
  currentTotalResults: number
}

const useSearchMore = ({
  initialOffset,
  initialHasMore,
  currentTotalResults,
  totalResults
}: Props) => {
  const [offset, setOffset] = useState<number>(initialOffset)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore)

  useEffect(() => {
    currentTotalResults === totalResults && setHasMore(false)
  }, [currentTotalResults, totalResults])

  const increaseOffset = () => {
    setOffset(offset + 1)
  }

  const reset = () => {
    setHasMore(initialHasMore)
    setOffset(initialOffset)
  }

  return {
    offset,
    hasMore,
    increaseOffset,
    reset
  }
}

export default useSearchMore
