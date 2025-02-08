'use client'
import Box from '@mui/material/Box'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export default MainContent
