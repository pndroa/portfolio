'use client'
import { Box } from '@mui/material'
import React, { forwardRef } from 'react'
import Button from '@/components/Button'

// `forwardRef` verwenden, um das Ref an `Box` weiterzuleiten
const Header = forwardRef<HTMLElement>((_, ref) => {
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
      ref={ref} // Hier wird das Ref richtig gesetzt
    >
      <Button targetId='ueberMich'>Über mich</Button>
      <Button targetId='ausbildung'>Ausbildung</Button>
      <Button targetId='berufserfahrung'>Berufserfahrung</Button>
      <Button targetId='faehigkeiten'>Fähigkeiten</Button>
      <Button targetId='projekte'>Projekte</Button>
    </Box>
  )
})

// Display Name für Debugging
Header.displayName = 'Header'

export default Header
