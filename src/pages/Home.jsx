import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import CategorySection from '../sections/CategorySection'
import HowItWorks from '../sections/HowItWorks'
import AboutSection from '../sections/AboutSection'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import ClosingCTA from '../sections/ClosingCTA'
import Footer from '../components/Footer'
import MobileBottomNav from '../components/MobileBottomNav'




function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF7]">

      <Navbar />

      <main>
        <HeroSection />
        <CategorySection />
        <HowItWorks />
        <AboutSection />
        <Testimonials /> 
        <FAQ />
        <ClosingCTA />
          
      </main>

      <Footer />

      <MobileBottomNav />

    </div>
  )
}

export default Home