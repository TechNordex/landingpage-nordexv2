import { useState } from 'react'
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

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
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
        <NordyChat />
      </div>
    </>
  )
}
