import Button from '@mui/material/Button'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  targetId: string // Ziel-Section als Prop
}

const ButtonComponent: React.FC<Props> = ({ children, targetId }) => {
  const handleScroll = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Button
      sx={{
        height: '2.5rem',
        width: '10rem',
        background: 'linear-gradient(143deg, #B380FF 10%, #7AF0FF 90%)',
        color: '#000',
      }}
      onClick={handleScroll} // Dynamisches Scrollen
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
