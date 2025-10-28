import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import CharacterGrid from '../components/CharacterGrid'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
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
