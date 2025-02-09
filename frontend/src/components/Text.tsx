'use client'
import React from 'react'
import Typography from '@mui/material/Typography'
import { ComponentProps } from '@/lib/types'
import { mergeSx } from 'merge-sx'
import { Noto_Sans_TC } from 'next/font/google'

const notoSansTC = Noto_Sans_TC({ subsets: ['latin'], weight: ['400'] })

const Text: React.FC<ComponentProps> = ({ children, sx }) => {
  return (
    <Typography
      variant='body1'
      sx={mergeSx(
        {
          fontFamily: notoSansTC.style.fontFamily,
        },
        sx
      )}
    >
      {children}
    </Typography>
  )
}

export default Text
