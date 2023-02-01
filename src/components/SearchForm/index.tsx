import React, { useState } from 'react'

interface Props {
  onSubmit: (keyword: string) => void
}

const SearchForm = ({ onSubmit }: Props) => {
  const [keyword, setKeyword] = useState<string>('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword) return
    onSubmit(keyword)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className='flex w-full rounded-md overflow-hidden border-2 border-black'
    >
      <input
        className='flex-1 px-3'
        type='text'
        name='name'
        required
        placeholder='Search here'
        value={keyword}
        onChange={handleOnChange}
      />
      <button type='submit' className='p-2 bg-black'>
        🔍
      </button>
    </form>
  )
}

export default SearchForm
