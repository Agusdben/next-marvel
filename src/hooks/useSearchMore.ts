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
    const endResults = () => {
      setHasMore(false)
      setOffset(0)
    }

    const continueSearching = () => setHasMore(true)
    currentTotalResults === totalResults ? endResults() : continueSearching()
  }, [currentTotalResults, totalResults])

  const increaseOffset = () => {
    setOffset(prev => prev + 1)
  }

  return {
    offset,
    hasMore,
    increaseOffset
  }
}

export default useSearchMore
