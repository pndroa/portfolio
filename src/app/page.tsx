'use client';
import ButtonComponent from '@/components/Button';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { Box } from '@mui/material';
import React from 'react';

export default function Home() {
  /* states */
  const [activeButton, setActiveButton] = React.useState<string>('home');

  /* Refs */
  const homeRef = React.useRef<HTMLTableSectionElement | null>(null);
  const aboutRef = React.useRef<HTMLTableSectionElement | null>(null);
  const resumeRef = React.useRef<HTMLTableSectionElement | null>(null);
  const projectRef = React.useRef<HTMLTableSectionElement | null>(null);

  return (
    <>
      <Box>
        <Box className='fixed top-0 left-0 w-full z-50'>
          <Navbar>
            <ButtonComponent
              isActiv={activeButton === 'home'}
              onClick={() => {
                setActiveButton('home');
                homeRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Home
            </ButtonComponent>
            <ButtonComponent
              isActiv={activeButton === 'about'}
              onClick={() => {
                setActiveButton('about');
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About Me
            </ButtonComponent>
            <ButtonComponent
              isActiv={activeButton === 'resume'}
              onClick={() => {
                setActiveButton('resume');
                resumeRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Resume
            </ButtonComponent>
            <ButtonComponent
              isActiv={activeButton === 'projects'}
              onClick={() => {
                setActiveButton('projects');
                projectRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Projects
            </ButtonComponent>
          </Navbar>
        </Box>
        <Section ref={homeRef}>Home</Section>
        <Section ref={aboutRef}>About</Section>
        <Section ref={resumeRef}>Resume</Section>
        <Section ref={projectRef}>Project</Section>
      </Box>
    </>
  );
}
