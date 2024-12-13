import React from "react"
import Link from "next/link"

interface Props {
  link: string
  name: string
}

const FooterElements: React.FC<Props> = ({ link, name }) => {
  return (
    <Link href={link} className="text-black decoration-none text-4xl">
      {name}
    </Link>
  )
}

export default FooterElements
