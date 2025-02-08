'use client'
import React from 'react'
import { Box } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { mergeSx } from 'merge-sx'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  height?: string
  sx?: SxProps<Theme>
}

const Section: React.FC<SectionProps> = ({ children, sx, ...rest }) => {
  return (
    <Box
      component='section'
      sx={mergeSx(
        {
          width: '95%',
          backgroundColor: 'black',
          height: '50vh',
          marginTop: '2rem',
        },
        sx
      )}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Section
