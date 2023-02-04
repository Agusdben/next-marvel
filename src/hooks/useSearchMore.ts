import { useState } from 'react'

interface Props {
  initialOffset: number
  initialHasMore: boolean
}

const useSearchMore = ({ initialOffset, initialHasMore }: Props) => {
  const [offset, setOffset] = useState<number>(initialOffset)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore)

  const increaseOffset = () => {
    setOffset(offset + 1)
  }

  const setLimitResultsReached = () => {
    setHasMore(false)
  }

  return {
    offset,
    hasMore,
    increaseOffset,
    setLimitResultsReached
  }
}

export default useSearchMore
