import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { useSidebar } from '../../contexts/SidebarContext'
import HeroBanner from './components/HeroBanner'
import CharacterGrid from './components/CharacterGrid'
import PromoBanner from './components/PromoBanner'
import ExperienceSection from './components/ExperienceSection'
import FAQSection from './components/FAQSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from '../../components/layout/Footer'

const LandingPage = () => {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Fixed Header */}
      <Header />
      
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`} style={{ paddingTop: '60px' }}>
        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:p-8 py-6 max-w-[1800px] mx-auto w-full">
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
        </main>
      </div>
    </div>
  )
}

export default LandingPage
