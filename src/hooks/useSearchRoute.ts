import { useRouter } from 'next/router'

interface Props {
  baseRoute: string
}

const useSearchRoute = ({ baseRoute }: Props) => {
  const router = useRouter()

  const handleSearch = (keyword: string, params: string) => {
    router.push(`${baseRoute}/${keyword}?${params}`)
  }

  return {
    handleSearch
  }
}

export default useSearchRoute
