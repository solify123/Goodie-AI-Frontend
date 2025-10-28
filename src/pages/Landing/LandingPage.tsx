import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import HeroBanner from './HeroBanner'
import CharacterGrid from './CharacterGrid'
import PromoBanner from './PromoBanner'
import ExperienceSection from './ExperienceSection'
import FAQSection from './FAQSection'
import TestimonialsSection from './TestimonialsSection'
import Footer from '../../components/layout/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content with Fixed Header */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto" style={{ paddingTop: "90px" }}>
          <div className="p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Section Title */}
            <div className="mt-10 lg:mt-12 mb-6 lg:mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold">
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
