import React from "react"
import { Box } from "@mui/material"

interface Props {
  children?: React.ReactNode
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <Box className="flex gap-[2rem] justify-end pr-[2rem] fixed top-0 left-0 w-[100%] bg-black sm:gap-0 sm:pr-0">
      {children}
    </Box>
  )
}

export default Header
