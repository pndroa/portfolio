'use client'
import Section from '@/components/Section'
import Box from '@mui/material/Box'
import Headline from '@/components/Headline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainContent from '@/components/MainContent'
import Image from 'next/image'

export default function Home() {
  return (
    <Box>
      <Header />
      <MainContent>
        <Section
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '3rem',
              paddingLeft: '10rem',
            }}
          >
            <Headline>Portfolio von Ergün Bickici</Headline>
            Softwareentwickler an der Hochschule Esslingen
          </Box>
          <Image src='/cat.png' alt='cat' width='550' height='550' />
        </Section>
        <Section id='ueberMich'>
          <Headline>Über mich</Headline>
        </Section>
        <Section id='ausbildung'>
          <Headline>Ausbildung</Headline>
        </Section>
        <Section id='berufserfahrung'>
          <Headline>Berufserfahrung</Headline>
        </Section>
        <Section id='fähigkeiten'>
          <Headline>Technische Fähigkeiten</Headline>
        </Section>
        <Section id='projekte'>
          <Headline>Meine Projekte</Headline>
          test commit laptop
        </Section>
      </MainContent>
      <Footer />
    </Box>
  )
}
