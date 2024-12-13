import React from "react"
import { Button } from "@mui/material"

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

const ButtonComponent: React.FC<Props> = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>
}

export default ButtonComponent
