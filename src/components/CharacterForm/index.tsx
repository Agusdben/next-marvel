import React, { useState } from 'react'

interface Props {
  onSubmit: (keyword: string) => void
}

const CharacterForm = ({ onSubmit }: Props) => {
  const [values, setValues] = useState({ name: '' })

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
    onSubmit(values.name)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type='text'
        name='name'
        placeholder='Hero name...'
        value={values.name}
        onChange={handleOnChange}
      />
      <button type='submit'>🔍</button>
    </form>
  )
}

export default CharacterForm
