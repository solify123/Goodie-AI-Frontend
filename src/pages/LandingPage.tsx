import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import CharacterGrid from '../components/CharacterGrid'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Padding Test - Remove this after verification */}
          <div className="bg-red-500 p-4 mb-4 text-white">
            Padding Test: If you can see red space around this text, padding is working!
          </div>
          
          {/* Hero Banner */}
          <HeroBanner />

          {/* Section Title */}
          <div className="mt-8 lg:mt-10 mb-6 lg:mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              AI Boyfriend Characters
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
