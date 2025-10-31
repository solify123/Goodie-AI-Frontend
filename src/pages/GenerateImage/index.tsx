import Layout from '../../components/layout'
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
    <Layout>
      <div className="generate-image-page w-full">
        {/* Top Navigation Bar */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Left side - Back button and category filters */}
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-gray-300 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Category buttons */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 bg-[#2a2a2a] rounded-lg px-4 py-2 text-white hover:bg-[#3a3a3a] transition-colors">
                    <span className="text-lg">♀</span>
                    <span className="text-sm">Girls</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-[#2a2a2a] rounded-lg px-4 py-2 text-white hover:bg-[#3a3a3a] transition-colors">
                    <span className="text-lg">👁</span>
                    <span className="text-sm">Anime</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-purple-600 rounded-lg px-4 py-2 text-white hover:bg-purple-700 transition-colors">
                    <span className="text-lg">♂</span>
                    <span className="text-sm">Guys</span>
                  </button>
                </div>
              </div>

              {/* Center - Title */}
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-white">Generate Image</h1>
                <p className="text-gray-400 text-sm">Choose character</p>
              </div>

              {/* Right side - Discovery, My AI's, and sparkle icons */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                  <button className="flex items-center space-x-2 bg-purple-600 rounded-lg px-4 py-2 text-white hover:bg-purple-700 transition-colors">
                    <Circle className="w-2 h-2 fill-white" />
                    <span className="text-sm">Discovery</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-[#2a2a2a] rounded-lg px-4 py-2 text-white hover:bg-[#3a3a3a] transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">My AI's</span>
                  </button>
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-2 py-6">
            {/* Character Grid */}
            <div className="grid grid-cols-4 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="relative group cursor-pointer">
                  {/* Character Image */}
                  <div className="aspect-[3/4] relative rounded-[1.2rem] overflow-hidden">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Character Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70">
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
    </Layout>
  )
}

export default GenerateImagePage