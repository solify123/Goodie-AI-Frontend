import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import CharacterGrid from '../components/CharacterGrid'

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
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-[1800px] mx-auto w-full pt-20">
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
        </main>
      </div>
    </div>
  )
}

export default LandingPage
