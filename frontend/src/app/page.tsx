'use client'
import Section from '@/components/Section'
import Box from '@mui/material/Box'
import Headline from '@/components/Headline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainContent from '@/components/MainContent'

export default function Home() {
  return (
    <Box>
      <Header />
      <MainContent>
        <Section>
          <Headline>Portfolio von Ergün Bickici</Headline>
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
        </Section>
      </MainContent>
      <Footer />
    </Box>
  )
}
