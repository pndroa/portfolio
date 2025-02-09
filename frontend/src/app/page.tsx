'use client'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

export default function Home() {
  const [showButton, setShowButton] = useState<boolean>(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    const currentHeaderRef = headerRef.current

    if (currentHeaderRef) {
      observer.observe(currentHeaderRef)
    }
    return () => {
      if (currentHeaderRef) {
        observer.unobserve(currentHeaderRef)
      }
    }
  }, [])

  return (
    <>
      <Header ref={headerRef} />
      <Main />
      {showButton && (
        <button
          onClick={() => {
            console.log('Button wurde geklickt!')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            position: 'fixed',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ArrowCircleUpIcon />
        </button>
      )}

      <Footer />
    </>
  )
}
