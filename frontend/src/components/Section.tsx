'use client'
import React from 'react'
import { Box } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { mergeSx } from 'merge-sx'

interface SectionProps {
  children?: React.ReactNode
  height?: string
  sx?: SxProps<Theme>
  id: string // id als Prop
}

const Section: React.FC<SectionProps> = ({
  children,
  sx,
  height = '50vh',
  id,
}) => {
  return (
    <Box
      component='section'
      id={id} // id hier nutzen
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
