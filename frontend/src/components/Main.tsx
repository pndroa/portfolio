import React from 'react'
import Headline from './Headline'
import Section from './Section'
import Text from './Text'
import Image from 'next/image'
import Box from '@mui/material/Box'

const Main = () => {
  return (
    <>
      <Section id='start'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            maxWidth: '25%',
          }}
        >
          <Headline>Portfolio von Ergün Bickici</Headline>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
            quibusdam repudiandae non debitis quod animi excepturi tenetur unde
            incidunt recusandae.
          </Text>
        </Box>
        <Image src='/cat.png' alt='A cat' width={400} height={400} />
      </Section>
      <Section id='ueberMich'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            maxWidth: '20%',
          }}
        >
          <Headline>Über mich</Headline>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
            quibusdam repudiandae non debitis quod animi excepturi tenetur unde
            incidunt recusandae.
          </Text>
        </Box>
        <Text sx={{ maxWidth: '25%', paddingTop: '5.5rem' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
          quibusdam repudiandae non debitis quod animi excepturi tenetur unde
          incidunt recusandae.
        </Text>
      </Section>
      <Section id='ausbildung'>
        <Headline>Ausbildung</Headline>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
          quibusdam repudiandae non debitis quod animi excepturi tenetur unde
          incidunt recusandae.
        </Text>
      </Section>
      <Section id='berufserfahrung'>
        <Headline>Berufserfahrung</Headline>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
          quibusdam repudiandae non debitis quod animi excepturi tenetur unde
          incidunt recusandae.
        </Text>
      </Section>
      <Section id='faehigkeiten'>
        <Headline>Fähigkeiten</Headline>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
          quibusdam repudiandae non debitis quod animi excepturi tenetur unde
          incidunt recusandae.
        </Text>
      </Section>
      <Section id='projekte'>
        <Headline>Projekte</Headline>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          consequuntur fuga et aperiam, iste amet corrupti dolor ea deserunt,
          quibusdam repudiandae non debitis quod animi excepturi tenetur unde
          incidunt recusandae.
        </Text>
      </Section>
    </>
  )
}

export default Main
