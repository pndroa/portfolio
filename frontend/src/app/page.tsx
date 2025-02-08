import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Section from '@/components/Section'
import Button from '@/components/ButtonComponent'

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Section>
          <Button />
        </Section>
        <Section headline='Porfolio von Max Mustermann'></Section>
        <Section headline='über mich'></Section>
        <Section headline='Ausbildung'></Section>
        <Section headline='berufserfahrung'></Section>
        <Section headline='technische fähigkeiten'></Section>
        <Section headline='meine Projekte'></Section>
        <Section headline='Kontakte'></Section>
      </Grid>
    </Box>
  )
}
