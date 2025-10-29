import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { ChevronLeft, Sparkles, Heart, Circle } from 'lucide-react'

const GenerateImagePage = () => {
  const characters = [
    {
      id: 1,
      name: 'Charles',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
      description: 'Professional businessman with dark hair and beard'
    },
    {
      id: 2,
      name: 'Erik',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
      description: 'Casual style with light brown hair and bomber jacket'
    },
    {
      id: 3,
      name: 'John',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face',
      description: 'Older gentleman with gray hair and overalls'
    },
    {
      id: 4,
      name: 'Malik',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
      description: 'Smiling professional with short dark hair'
    },
    {
      id: 5,
      name: 'Victor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face',
      description: 'Long blonde hair with crossed arms'
    },
    {
      id: 6,
      name: 'Ethan',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face',
      description: 'Formal tuxedo with curly light brown hair'
    },
    {
      id: 7,
      name: 'Jin',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face',
      description: 'Asian professional in black suit'
    },
    {
      id: 8,
      name: 'Kenji',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop&crop=face',
      description: 'Smiling Asian professional in white shirt'
    }
  ]

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
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-8">
              {/* Left side - Back button */}
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Center - Category buttons */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white hover:bg-[#2a2a2a] transition-colors">
                  <span className="text-lg">♀</span>
                  <span className="text-sm">Girls</span>
                </button>
                <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white hover:bg-[#2a2a2a] transition-colors">
                  <span className="text-lg">👁</span>
                  <span className="text-sm">Anime</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 border border-purple-600 rounded-lg px-4 py-2 text-white hover:bg-purple-700 transition-colors">
                  <span className="text-lg">♂</span>
                  <span className="text-sm">Guys</span>
                </button>
              </div>

              {/* Right side - Sparkle icon */}
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>

            {/* Page Title and Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Generate Image</h1>
                <p className="text-gray-400 text-lg">Choose character.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-purple-600 border border-purple-600 rounded-lg px-4 py-2 text-white hover:bg-purple-700 transition-colors">
                  <Circle className="w-3 h-3 fill-white" />
                  <span className="text-sm">Discovery</span>
                </button>
                <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white hover:bg-[#2a2a2a] transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">My AI's</span>
                </button>
                <Sparkles className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Character Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {characters.map((character) => (
                <div key={character.id} className="relative group cursor-pointer">
                  {/* Character Image */}
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                    <img 
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Character Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm">
                      <div className="p-3">
                        <h3 className="text-white font-medium text-sm text-center">
                          {character.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GenerateImagePage
