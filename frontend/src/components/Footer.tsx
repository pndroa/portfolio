import React from 'react'
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '2rem',
        padding: '3rem',
      }}
    >
      <PhoneIcon />
      <EmailIcon />
      <LinkedInIcon />
      <GitHubIcon />
    </Box>
  )
}

export default Footer
