import React from 'react'
import Headline from './Headline'
import Section from './Section'
import Text from './Text'
import Box from '@mui/material/Box'
import Image from 'next/image'

const Main = () => {
  return (
    <>
      <Section
        id='start'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            //border: 'solid',
            width: '60%',
            height: '50%',
            display: 'flex',
            gap: '5rem',
          }}
        >
          <Box
            sx={{
              //background: 'blue',
              width: '50%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}
          >
            <Headline sx={{ width: '100%', height: '15%' }}>
              Porfolio von Ergün Bickici
            </Headline>
            <Text>Softwareentwickler an der Hochschule Esslingen</Text>
          </Box>
          <Box
            sx={{
              //background: 'red',
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src='/cat.png' width={600} height={600} alt='cat' />
          </Box>
        </Box>
      </Section>

      <Section
        id='ueberMich'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            //background: 'blue',
            //border: 'solid',
            width: '60%',
            height: '50%',
          }}
        >
          <Headline>Über mich</Headline>
          <Box
            sx={{
              //background: 'green',
              height: '75%',
              display: 'flex',
              gap: '5rem',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text sx={{ minWidth: '10%', maxWidth: '50%' }}>
              Hallo! Ich bin Max Mustermann, ein angehender Softwareentwickler
              an der Hochschule Esslingen. Leidenschaftlich interessiert an der
              Entwicklung innovativer Softwarelösungen, strebe ich nach
              kreativen und praktischen Anwendungen der Technologie.
            </Text>
            <Text sx={{ minWidth: '10%', maxWidth: '50%' }}>
              Mein Fokus liegt auf der Erstellung effizienter und
              benutzerfreundlicher Software, die auf den neuesten Trends
              basiert. Durch meine Ausbildung und diverse Projekte konnte ich
              wertvolle Fähigkeiten in verschiedenen Programmiersprachen und
              Technologien erwerben.
            </Text>
          </Box>
        </Box>
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
