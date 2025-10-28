import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/HeroBanner'
import CharacterGrid from '../components/CharacterGrid'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header - Full width at top */}
      <Header />
      
      {/* Main Layout - Sidebar and Content below header */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Character Grid */}
          <CharacterGrid />
        </main>
      </div>
    </div>
  )
}

export default LandingPage
