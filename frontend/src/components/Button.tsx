'use client'
import React from 'react'
import Button from '@mui/material/Button'
import { ComponentProps } from '@/lib/types'
import { mergeSx } from 'merge-sx'

interface Props extends ComponentProps {
  targetId?: string
}

const ButtonComponent: React.FC<Props> = ({ children, sx, targetId }) => {
  const handleScroll = () => {
    document.getElementById(targetId as string)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Button
      sx={mergeSx(
        {
          height: '3rem',
          width: '8rem',
          fontSize: '0.7rem',
          background: '#666cd2',
          borderRadius: '0.5rem',
          fontWeight: 'bolder',
          color: 'white',
        },
        sx
      )}
      onClick={handleScroll}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
