import HeroBanner from './components/HeroBanner'
import { GirlsGrid, MenGrid, AnimeGrid } from './components/CharacterGrids'
import PromoBanner from './components/PromoBanner'
import ExperienceSection from './components/ExperienceSection'
import FAQSection from './components/FAQSection'
import Layout from '../../components/layout'
import Footer from '../../components/layout/Footer'
import { useLandingTab } from '../../contexts/LandingTabContext'
import BottomNavigation from '../../components/layout/BottomNavigation'
import { Mars, Sparkles, Venus } from 'lucide-react'

const LandingPage = () => {
  const { activeTab, setActiveTab } = useLandingTab()

  const tabs = [
    { key: 'girls', label: 'Girls', Icon: Venus },
    { key: 'anime', label: 'Anime', Icon: Sparkles },
    { key: 'guys', label: 'Guys', Icon: Mars },
  ] as const

  // Render the appropriate component based on active tab
  const renderCharacterGrid = () => {
    switch (activeTab) {
      case 'girls':
        return <GirlsGrid />
      case 'guys':
        return <MenGrid />
      case 'anime':
        return <AnimeGrid />
      default:
        return <GirlsGrid />
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
      {/* Mobile Navigation */}
      <nav className="hidden min-[320px]:flex md:hidden">
        <ul className="flex w-full items-center gap-2 bg-[#1A1A24] p-2">
          {tabs.map(({ key, label, Icon }) => {
            const isActive = activeTab === key
            return (
              <li key={key} className="flex-1">
                <button
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all ${isActive
                    ? 'outline-2 outline-[#009688]'
                    : 'text-gray-300 hover:bg-white/5'
                    }`}
                  aria-pressed={isActive}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      {/* Hero Banner */}
      <HeroBanner />
      <div className="landing-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Section Title */}
        <div className="mt-8 lg:mt-12 mb-4 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold md:text-left text-center">
            <span className="text-[#009688]">{getSectionTitle()}</span>
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
        <BottomNavigation />
      </div>
      {/* Footer */}
      <Footer />
    </Layout>
  )
}

export default LandingPage
