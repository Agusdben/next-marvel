import { useRouter } from 'next/router'

interface Props {
  baseRoute: string
}

const useSearchRoute = ({ baseRoute }: Props) => {
  const router = useRouter()

  const handleSearch = (params: string) => {
    router.push(`${baseRoute}?${params}`)
  }

  return {
    handleSearch
  }
}

export default useSearchRoute
