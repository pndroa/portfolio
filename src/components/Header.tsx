import React from "react"

interface Props {
  children?: React.ReactNode
}

const Header: React.FC<Props> = ({ children }) => {
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

export default Header
