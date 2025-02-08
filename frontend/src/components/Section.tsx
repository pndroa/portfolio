'use client'
import React from 'react'
import { Box } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { mergeSx } from 'merge-sx'

interface SectionProps {
  children?: React.ReactNode
  height?: string
  sx?: SxProps<Theme>
}

const Section: React.FC<SectionProps> = ({ children, sx, height = '50vh' }) => {
  return (
    <Box
      component='section'
      sx={mergeSx(
        {
          width: '95%',
          height: height,
          backgroundColor: 'black',
        },
        sx
      )}
    >
      {children}
    </Box>
  )
}

export default Section
