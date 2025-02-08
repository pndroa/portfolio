'use client'
import Button from '@mui/material/Button'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const ButtonComponent: React.FC<Props> = ({ children }) => {
  return (
    <Button
      sx={{
        height: '2.5rem',
        width: '10rem',
        background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
        color: '#000', // Sicherstellen, dass der Text schwarz bleibt
      }}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
