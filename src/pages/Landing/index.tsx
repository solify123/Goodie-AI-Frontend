import HeroBanner from './components/HeroBanner'
import CharacterGrid from './components/CharacterGrid'
import PromoBanner from './components/PromoBanner'
import ExperienceSection from './components/ExperienceSection'
import FAQSection from './components/FAQSection'
import TestimonialsSection from './components/TestimonialsSection'
import Layout from '../../components/layout'
import Footer from '../../components/layout/Footer'

const LandingPage = () => {

  return (
    <Layout>
      <div className="landing-page w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Section Title */}
        <div className="mt-8 lg:mt-12 mb-4 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            <span className="text-pink-500">AI Boyfriend</span>
            <span className="text-white"> Characters</span>
          </h1>
        </div>

        {/* Character Grid */}
        <CharacterGrid />

        {/* Promotional Banner */}
        <div className="mt-16 lg:mt-20">
          <PromoBanner />
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>  
      {/* Footer */}
      <Footer />
    </Layout>
  )
}

export default LandingPage
