'use client'
import Link from '@/components/LinkComponent'
import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'

const Footer = () => {
  return (
    <Box
      id='kontakt'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '2rem',
        paddingY: '1rem',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem',
      }}
    >
      <Link href='https://github.com/pndroa/'>
        <GitHubIcon />
      </Link>
      <Link href='http://www.google.com/'>
        <GitHubIcon />
      </Link>
    </Box>
  )
}

export default Footer
