import AppLayout from '@/components/AppLayout'
import Link from 'next/link'

export default function Home () {
  return (
    <AppLayout>
      <Link href='/about'>About</Link>
      <h1>HOME</h1>
    </AppLayout>
  )
}
