'use client'
import React from 'react'
import Typography from '@mui/material/Typography'
import { ComponentProps } from '@/lib/types'
import { mergeSx } from 'merge-sx'
import { Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'], weight: ['500'] })

const Headline: React.FC<ComponentProps> = ({ children, sx }) => {
  return (
    <Typography
      variant='h4'
      sx={mergeSx(
        {
          fontFamily: sora.style.fontFamily,
          background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        sx
      )}
    >
      {children}
    </Typography>
  )
}

export default Headline
