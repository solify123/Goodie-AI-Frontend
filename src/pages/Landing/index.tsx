import HeroBanner from './components/HeroBanner'
import Girls from './components/girls'
import Men from './components/men'
import Anime from './components/anime'
import PromoBanner from './components/PromoBanner'
import ExperienceSection from './components/ExperienceSection'
import FAQSection from './components/FAQSection'
import Layout from '../../components/layout'
import Footer from '../../components/layout/Footer'
import { useLandingTab } from '../../contexts/LandingTabContext'

const LandingPage = () => {
  const { activeTab } = useLandingTab()

  // Render the appropriate component based on active tab
  const renderCharacterGrid = () => {
    switch (activeTab) {
      case 'girls':
        return <Girls />
      case 'guys':
        return <Men />
      case 'anime':
        return <Anime />
      default:
        return <Girls />
    }
  }
  
  const getSectionTitle = () => {
    switch (activeTab) {
      case 'girls':
        return 'AI Girlfriend'
      case 'guys':
        return 'AI Boyfriend'
      case 'anime':
        return 'AI Anime'
      default:
        return 'AI Boyfriend'
    }
  }

  return (
    <Layout>
      <div className="landing-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Section Title */}
        <div className="mt-8 lg:mt-12 mb-4 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            <span className="text-pink-500">{getSectionTitle()}</span>
            <span className="text-white"> Characters</span>
          </h1>
        </div>

        {/* Character Grid - Dynamic based on active tab */}
        {renderCharacterGrid()}

        {/* Promotional Banner */}
        <div className="mt-16 lg:mt-20">
          <PromoBanner />
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Experience Section */}
        <ExperienceSection />
      </div>  
      {/* Footer */}
      <Footer />
    </Layout>
  )
}

export default LandingPage
