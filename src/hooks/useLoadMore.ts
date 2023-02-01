import { useState } from 'react'

interface StateType {
  params: { [key: string]: any }
}

function useLoadMore<t extends StateType> ({ offset }) {
  const [state, setState] = useState<t>(intialState)
  const [hasMore, sethasMore] = useState<boolean>(true)

  return {
    items: state.items
  }
}

export default useLoadMore
