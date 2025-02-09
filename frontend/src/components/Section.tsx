'use client'
import React from 'react'
import { Box } from '@mui/material'
import { ComponentProps } from '@/lib/types'
import { mergeSx } from 'merge-sx'

const Section: React.FC<ComponentProps> = ({ children, sx, ...rest }) => {
  return (
    <Box
      component='section'
      sx={mergeSx(
        {
          height: '40vh',
          //borderTop: 'solid',
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
