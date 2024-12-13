import React from "react"
import Link from "next/link"

interface Props {
  link: string
  name: string
}

const HeaderElements: React.FC<Props> = ({ link, name }) => {
  return (
    <Link
      href={link}
      style={{
        textDecoration: "none",
        color: "black",
        fontSize: "50px",
      }}
    >
      {name}
    </Link>
  )
}

export default HeaderElements
