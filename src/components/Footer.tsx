import React from "react"

interface Props {
  children?: React.ReactNode
}

const Footer: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
      }}
    >
      {children}
    </div>
  )
}

export default Footer
