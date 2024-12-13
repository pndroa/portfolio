import Footer from "@/components/Footer"
import Header from "@/components/Header"
import FooterElements from "@/components/FooterElements"
import HeaderElements from "@/components/HeaderElements"

export default function Home() {
  return (
    <>
      <Header>
        <HeaderElements link="/" name="About"></HeaderElements>
      </Header>
      <h1>Hello World</h1>
      <Footer>
        <FooterElements link="/" name="Dashbord" />
      </Footer>
    </>
  )
}
