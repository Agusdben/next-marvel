import AppLayout from '@/components/AppLayout'
import { getCharacters } from '@/services/Characters'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Characters = ({ characters }: { characters: any }) => {
  return (
    <AppLayout headTitle='characters | Next Marvel'>
      {characters.map(c => (
        <div key={c.id}>
          <Link href={`/Character/${c.id}`}>
            <p>{c.name}</p>
          </Link>
          <Image
            alt={`Marvel character named ${c.name}`}
            src={`${c.thumbnail.path}.${c.thumbnail.extension}`}
            width={400}
            height={320}
          ></Image>
        </div>
      ))}
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { data } = await getCharacters()
  const characters = data.results
  return {
    props: {
      characters
    }
  }
}
export default Characters
