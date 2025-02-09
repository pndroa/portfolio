'use client'
import { Box } from '@mui/material'
import React from 'react'
import Button from '@/components/Button'

const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '2rem',
        padding: '3rem',
      }}
    >
      <Button targetId='ueberMich'>Über mich</Button>
      <Button targetId='ausbildung'>Ausbildung</Button>
      <Button targetId='berufserfahrung'>Berufserfahrung</Button>
      <Button targetId='faehigkeiten'>Fähigkeiten</Button>
      <Button targetId='projekte'>Projekte</Button>
    </Box>
  )
}

export default Header
