import React from "react"
import { Box } from "@mui/material"

interface Props {
  ref?: React.RefObject<HTMLTableSectionElement | null>
  children?: React.ReactNode
}

const Section: React.FC<Props> = ({ ref, children }) => {
  return (
    <Box
      component="section"
      ref={ref}
      className="grid place-items-center content-center min-h-[100vh]"
    >
      {children}
    </Box>
  )
}

export default Section
