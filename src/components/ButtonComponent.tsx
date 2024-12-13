import React from "react"
import { Button } from "@mui/material"

interface Props {
  onClickEvent?: () => void
  children?: React.ReactNode
}

const ButtonComponent: React.FC<Props> = ({ onClickEvent, children }) => {
  return <Button onClick={onClickEvent}>{children}</Button>
}

export default ButtonComponent
