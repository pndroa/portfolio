import React from "react"

interface Props {
  children?: React.ReactNode
}

const Footer: React.FC<Props> = ({ children }) => {
  return <div className="flex gap-5">{children}</div>
}

export default Footer
