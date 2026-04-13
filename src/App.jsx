import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductDemo from './components/ProductDemo'
import NordySection from './components/NordySection'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Clients from './components/Clients'
import NordyChat from './components/NordyChat'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const appRef = useRef(null)

  useEffect(() => {
    if (!splashDone || !appRef.current) return

    animate(appRef.current, {
      opacity: [0, 1],
      y: ['1rem', 0],
      duration: 520,
      ease: 'out(3)',
    })
  }, [splashDone])

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <div
        ref={appRef}
        style={{
          opacity: splashDone ? 1 : 0,
          pointerEvents: splashDone ? 'all' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <ProductDemo />
          <Clients />
          <NordySection />
          <AboutUs />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
      <NordyChat />
    </>
  )
}
