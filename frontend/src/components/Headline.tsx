'use client'
import { Sora } from 'next/font/google'
import Typography from '@mui/material/Typography'
import React, { ReactNode } from 'react'

const sora = Sora({ subsets: ['latin'], weight: ['500'] })

interface Props {
  children: ReactNode
}

const Headline: React.FC<Props> = ({ children }) => {
  return (
    <Typography
      variant='h4'
      sx={{
        fontFamily: sora.style.fontFamily,
        background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </Typography>
  )
}

export default Headline
