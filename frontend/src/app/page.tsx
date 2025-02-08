'use client'
import Section from '@/components/Section'
import Box from '@mui/material/Box'

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5rem',
        width: '100%',
        paddingY: '10rem',
      }}
    >
      <Section></Section>
      <Section sx={{ backgroundColor: 'pink' }}></Section>
      <Section></Section>
    </Box>
  )
}
