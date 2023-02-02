import { SvgProps } from '@/types'
import * as React from 'react'

const ArrowRight = (props: SvgProps) => (
  <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      style={{
        fillOpacity: 1,
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: 1,
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeOpacity: 1
      }}
      d='M11.532 1048.341H9.536v-9h-9v-2h11z'
      transform='rotate(45 1254.793 524.438)'
    />
  </svg>
)

export default ArrowRight
