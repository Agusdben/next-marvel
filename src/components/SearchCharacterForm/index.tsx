import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SearchCharacterForm = () => {
  const [values, setValues] = useState({ name: '' })
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(lastValues => {
      return {
        ...lastValues,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/characters/search/${values.name}`)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type='text'
        name='name'
        required
        placeholder='Hero name...'
        value={values.name}
        onChange={handleOnChange}
      />
      <button type='submit'>🔍</button>
    </form>
  )
}

export default SearchCharacterForm
