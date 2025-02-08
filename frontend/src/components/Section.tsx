'use client'
import React from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

interface SectionProps {
  children?: React.ReactNode
  headline?: string
}

const Section: React.FC<SectionProps> = ({ children, headline }) => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        height: '10vh',
        padding: 2,
      }}
    >
      <Typography
        variant='h6'
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {headline}
      </Typography>
      {children}
    </Grid>
  )
}

export default Section
