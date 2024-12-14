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
          Home  
        </Section>
        <Section ref={aboutRef}>About Me</Section>
        <Section ref={cvRef}>CV</Section>
        <Section ref={projectsRef}>Projects</Section>
        <Section ref={contactsRef}>Contacts</Section>
      </Box>
    </>
  )
}
