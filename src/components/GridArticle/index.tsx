import { ReactChildren } from '@/types'
import React from 'react'

const GridArticle = ({ children }: ReactChildren) => {
  return (
    <article className='mb-12 grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-2 xl:grid-cols-4 content-center'>
      {children}
    </article>
  )
}

export default GridArticle
