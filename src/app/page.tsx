"use client"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import FooterElements from "@/components/FooterElements"
import HeaderElements from "@/components/HeaderElements"

export default function Home() {
  return (
    <>
      <Header>
        <HeaderElements link="/" name="About" />
        <HeaderElements link="/" name="Projects" />
        <HeaderElements link="/" name="Work" />
      </Header>
      <h1>Hello World</h1>
      <Footer>
        <FooterElements link="/" name="LinkedIn" />
        <FooterElements link="/" name="GitHub" />
        <FooterElements link="/" name="E-Mail" />
      </Footer>
    </>
  )
}
