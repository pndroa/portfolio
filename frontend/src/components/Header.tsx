'use client'
import { Box } from '@mui/material'
import React from 'react'
import Button from '@/components/ButtonComponent'

const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '2rem',
        paddingY: '1rem',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Button targetId='ueberMich'>Über mich</Button>
      <Button targetId='ausbildung'>Ausbildung</Button>
      <Button targetId='berufserfahrung'>Berufserfahrung</Button>
      <Button targetId='fähigkeiten'>Fähigkeiten</Button>
      <Button targetId='projekte'>Projekte</Button>
    </Box>
  )
}

export default Header
