import React from "react"

interface Props {
  children?: React.ReactNode
}

const Footer: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default Footer
