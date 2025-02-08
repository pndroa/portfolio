'use client'
import Section from '@/components/Section'
import Box from '@mui/material/Box'
import ButtonComponent from '@/components/ButtonComponent'

export default function Home() {
  return (
    <>
      <ButtonComponent targetId='section-1'>Section 1</ButtonComponent>
      <ButtonComponent targetId='section-2'>Section 2</ButtonComponent>
      <ButtonComponent targetId='section-3'>Section 3</ButtonComponent>

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
        <Section id='section-1'></Section>
        <Section id='section-2' sx={{ backgroundColor: 'pink' }}></Section>
        <Section id='section-3'></Section>
      </Box>
    </>
  )
}
