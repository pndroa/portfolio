'use client'
import Button from '@mui/material/Button'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  targetId?: string
}

const ButtonComponent: React.FC<Props> = ({ children, targetId }) => {
  const handleScroll = () => {
    document.getElementById(targetId as string)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Button
      sx={{
        height: '2rem',
        width: '8rem',
        fontSize: '0.7rem',
        background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
        color: '#000',
      }}
      onClick={handleScroll}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
