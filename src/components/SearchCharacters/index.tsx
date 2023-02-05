import { CHARACTER_URL_PARAMS } from '@/constants/characters'
import useSearchRoute from '@/hooks/useSearchRoute'
import { CharacterUriParams } from '@/types/character'
import { formatObjectToUrlParam } from '@/utiles'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../Button'
import SearchForm from '../SearchForm'
import Select from '../Select'

const SearchCharacters = () => {
  const router = useRouter()
  const [params, setPrams] = useState<CharacterUriParams>({
    limit: Number(router.query.limit) || CHARACTER_URL_PARAMS.limit,
    modifiedSince:
      router.query.modifiedSince || CHARACTER_URL_PARAMS.modifiedSince,
    offset: Number(router.query.offset) || CHARACTER_URL_PARAMS.offset,
    orderBy: router.query.orderBy || CHARACTER_URL_PARAMS.orderBy
  })
  const { handleSearch } = useSearchRoute({
    baseRoute: '/characters/search'
  })

  const handleOnsubmit = (keyword: string) => {
    const formatDate = params.modifiedSince
      ? new Date(String(params.modifiedSince)).toISOString()
      : ''
    const newParams: CharacterUriParams = {
      ...params,
      nameStartsWith: keyword || '',
      modifiedSince: formatDate
    }
    const formatedParams = formatObjectToUrlParam(newParams)
    handleSearch(formatedParams)
  }

  const handleParams = (value: string, name: string) => {
    setPrams(params => {
      return {
        ...params,
        [name]: value
      }
    })
  }

  const resetParams = () => {
    setPrams(CHARACTER_URL_PARAMS)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    handleParams(value, name)
  }

  const handleModifiedSince = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    handleParams(value, name)
  }

  return (
    <section className='flex flex-col gap-4 bg-background text-black uppercase p-4 rounded-md'>
      <article className='flex flex-wrap items-stretch justify-start gap-4'>
        <Select
          label='Limit'
          value={String(params.limit)}
          name='limit'
          onChange={handleSelect}
          options={['20', '50', '80', '100']}
        />
        <Select
          label='Order By'
          value={String(params.orderBy)}
          name='orderBy'
          onChange={handleSelect}
          options={['name', '-name', 'modified', '-modified']}
        />
        <div className='flex flex-col p-2 gap-1 items-center justify-center bg-primary rounded-md'>
          <label htmlFor='modifiedSince'>Modified Since</label>
          <input
            className='px-1'
            onChange={handleModifiedSince}
            type={'date'}
            value={params.modifiedSince}
            name='modifiedSince'
          />
        </div>
        <div className='mt-auto'>
          <Button type='button' onClick={resetParams} value='Reset' />
        </div>
      </article>
      <article>
        <SearchForm onSubmit={handleOnsubmit} />
      </article>
    </section>
  )
}

export default SearchCharacters
