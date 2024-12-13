"use client"
import React from "react"
import Header from "@/components/Header"
import ButtonComponent from "@/components/ButtonComponent"
import Section from "@/components/Section"
import { Box } from "@mui/material"
import { Card, CardFooter, Image, Button } from "@nextui-org/react"

export default function Home() {
  /* Refs */

  const homeRef = React.useRef<HTMLTableSectionElement | null>(null)
  const aboutRef = React.useRef<HTMLTableSectionElement | null>(null)
  const cvRef = React.useRef<HTMLTableSectionElement | null>(null)
  const projectsRef = React.useRef<HTMLTableSectionElement | null>(null)
  const contactsRef = React.useRef<HTMLTableSectionElement | null>(null)

  return (
    <>
      <Header>
        <ButtonComponent
          onClick={() => {
            homeRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          Home
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            console.log(aboutRef.current)
            aboutRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          About Me
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            cvRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          CV
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            projectsRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          Projects
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            contactsRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          Contacts
        </ButtonComponent>
      </Header>
      <Box>
        <Section ref={homeRef}>
          <Card isFooterBlurred className="border-none" radius="lg">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="https://nextui.org/images/hero-card.jpeg"
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
                onPress={() => {
                  alert("Thanks for visiting my Website :3")
                }}
              >
                Notify me
              </Button>
            </CardFooter>
          </Card>
        </Section>
        <Section ref={aboutRef}>About Me</Section>
        <Section ref={cvRef}>CV</Section>
        <Section ref={projectsRef}>Projects</Section>
        <Section ref={contactsRef}>Contacts</Section>
      </Box>
    </>
  )
}
