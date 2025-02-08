'use client'
import Link from '@mui/material/Link'
import React from 'react'

interface Props {
  children?: React.ReactNode
  href?: string
}

const LinkComponent: React.FC<Props> = ({ children, href }) => {
  return (
    <Link
      href={href}
      target='_blank'
      sx={{
        background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </Link>
  )
}

export default LinkComponent
