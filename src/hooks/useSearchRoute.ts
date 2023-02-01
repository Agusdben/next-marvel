import { useRouter } from 'next/router'

interface Props {
  baseRoute: string
}

const useSearchRoute = ({ baseRoute }: Props) => {
  const router = useRouter()

  const handleSearch = (keyword: string) => {
    router.push(`${baseRoute}/${keyword}`)
  }

  return {
    handleSearch
  }
}

export default useSearchRoute
