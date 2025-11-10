import { Sparkles, Shell, ArrowLeft, Venus, Mars, Telescope, HeartPulse, ImageDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import girlsData from '../../../config/girls.json' with { type: 'json' }
import menData from '../../../config/men.json' with { type: 'json' }
import animeData from '../../../config/anime.json' with { type: 'json' }
import { toast } from 'sonner'

interface Character {
  id: number | string
  name: string
  image: string
}

interface SelectCharatersProps {
  setSelectCharater: (value: boolean) => void
  onCharacterSelect: (character: Character) => void
  preselectedId?: number | string | null
}

const SelectCharaters = ({ setSelectCharater, onCharacterSelect, preselectedId = null }: SelectCharatersProps) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'girls' | 'anime' | 'guys'>('guys')
  const [activeDiscoveryTab, setActiveDiscoveryTab] = useState<'discovery' | 'myAI'>('discovery')
  const [selectedCharacter, setSelectedCharacter] = useState<number | string | null>(preselectedId)

  const girlsCharacters = girlsData.map((girl, index) => ({
    id: index + 1,
    name: girl.name,
    image: girl.defaultImage,
  })) as unknown as Character[]
  const guysCharacters = menData.map((man, index) => ({
    id: index + 1,
    name: man.name,
    image: man.defaultImage,
  })) as unknown as Character[]
  const animeCharacters = animeData.map((anime, index) => ({
    id: index + 1,
    name: anime.name,
    image: anime.defaultImage,
  })) as unknown as Character[]
  const myAICharacters = girlsData.map((girl, index) => ({
    id: index + 1,
    name: girl.name,
    image: girl.defaultImage,
  })) as unknown as Character[]

  const getCharactersByTab = () => {
    switch (activeDiscoveryTab) {
      case 'discovery':
        switch (activeTab) {
          case 'girls':
            return girlsCharacters
          case 'anime':
            return animeCharacters
          case 'guys':
            return guysCharacters
          default:
            return guysCharacters
        }
      case 'myAI':
        return myAICharacters
      default:
        return []
    }

  }

  const characters = getCharactersByTab()

  // Reset selection when tab changes
  const handleTabChange = (tab: 'girls' | 'anime' | 'guys') => {
    setActiveTab(tab)
    setSelectedCharacter(null)
  }

  const handleDiscoveryTabChange = (tab: 'discovery' | 'myAI') => {
    setActiveDiscoveryTab(tab)
    setSelectedCharacter(null)
  }

  return (
    <div className="generate-image-page w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Navigation Bar */}
      <div className="space-y-7 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectCharater(false)} className="cursor-pointer h-11 w-12 rounded-md bg-[#1a1a1a] flex justify-center items-center gap-2.5 border-2 border-transparent hover:bg-[#2e2e2e] hover:border-[#959595]/10 transition-all ease-in-out text-white">
              <ArrowLeft />
            </button>
            <div className="hidden lg:block">
              <div className="bg-[#1a1a1a] rounded-xl p-2">
                <div className="grid grid-cols-3 lg:gap-5">
                  <button onClick={() => handleTabChange('girls')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'myAI' ? 'text-[#969696]' : activeTab === 'girls' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                    <Venus />
                    <div>Girls</div>
                  </button>

                  <button onClick={() => handleTabChange('anime')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'myAI' ? 'text-[#969696]' : activeTab === 'anime' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                    <Shell />
                    <div>Anime</div>
                  </button>

                  <button onClick={() => handleTabChange('guys')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'myAI' ? 'text-[#969696]' : activeTab === 'guys' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Mars />
                    </div>
                    <div>Guys</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white text-center px-3">
            <div className="flex items-center gap-2">
              <ImageDown />
              <div className="flex flex-col">
                <h2 className="text-[18px] font-semibold text-nowrap">
                  Generate Image
                </h2>
                <p className="text-[14px] leading-5 text-nowrap">
                  Choose character
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <div className="bg-[#1a1a1a] rounded-xl p-2">
                <div className="grid grid-cols-2 lg:gap-1">
                  <button onClick={() => handleDiscoveryTabChange('discovery')} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'discovery' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                    <div className="flex items-center justify-center w-5 h-5">
                      <Telescope />
                    </div>
                    <div>Discovery</div>
                  </button>
                  <button onClick={() => handleDiscoveryTabChange('myAI')} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'myAI' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                    <HeartPulse />
                    <div>My AI's</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative cursor-pointer">
              <div className="h-11 w-12 rounded-md bg-[#1a1a1a] flex justify-center items-center gap-2.5 border-2 border-transparent hover:bg-[#2e2e2e] hover:border-[#959595]/10 transition-all ease-in-out text-white">
                <Sparkles onClick={() => navigate('/create-character')} className="cursor-pointer" />
              </div>
            </div>
          </div>


        </div>
        <div className="space-y-4 lg:hidden">
          <div className="bg-[#1a1a1a] rounded-xl p-2">
            <div className="grid grid-cols-3 lg:gap-5">
              <button onClick={() => handleTabChange('girls')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeTab === 'girls' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                <Venus />
                <div>Girls</div>
              </button>

              <button onClick={() => handleTabChange('anime')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeTab === 'anime' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                <Shell />
                <div>Anime</div>
              </button>

              <button onClick={() => handleTabChange('guys')} disabled={activeDiscoveryTab === 'myAI'} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeTab === 'guys' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                <div className="w-5 h-5 flex items-center justify-center">
                  <Mars />
                </div>
                <div>Guys</div>
              </button>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-2">
            <div className="grid grid-cols-2 lg:gap-1">
              <button onClick={() => handleDiscoveryTabChange('discovery')} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'discovery' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                <Telescope />
                <div>Discovery</div>
              </button>
              <button onClick={() => handleDiscoveryTabChange('myAI')} className={`px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md cursor-pointer ${activeDiscoveryTab === 'myAI' ? 'text-white bg-[#009688]/20 ring-2 ring-[#009688]/50' : 'text-[#969696]'}`}>
                <HeartPulse />
                <div>My AI's</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-2 py-6">
          {/* Character Grid */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className="relative flex flex-col"
              >
                {/* Character Image */}
                <div
                  onClick={() => setSelectedCharacter(character.id)}
                  className={`aspect-[3/4] relative rounded-[1.2rem] overflow-hidden transition-all duration-300 cursor-pointer group ${selectedCharacter === character.id
                    ? 'ring-5 ring-[#009688]/50'
                    : ''
                    }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-300"
                  />
                </div>

                {/* Character Name Button */}
                <button
                  onClick={() => setSelectedCharacter(character.id)}
                  className={`absolute bottom-3 left-3 right-3 z-10 mt-3 px-4 py-2 rounded-full text-white font-medium text-sm text-center transition-all duration-300 cursor-pointer backdrop-blur border ${selectedCharacter === character.id
                    ? 'bg-[#009688]/60 border-[#009688]/50 shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]'
                    : 'bg-black/30 hover:bg-white/15 border-white/20'
                    }`}
                >
                  {character.name}
                </button>
              </div>
            ))}
          </div>
          <div className='fixed bottom-0 left-0 right-0 z-10 md:static p-3 bg-[#131313]/80 border-t border-gray-800 md:border-t-0 md:bg-transparent md:p-0'>
            <button
              onClick={() => {
                if (!selectedCharacter) {
                  toast.error('Please select a character first.')
                  return
                }
                const chosen = characters.find((character) => character.id === selectedCharacter)
                if (!chosen) {
                  toast.error('Selected character could not be found.')
                  return
                }
                onCharacterSelect(chosen)
                setSelectCharater(false)
              }}
              className="w-[300px] mx-auto bg-gradient-to-r from-[#009688] to-[#00bfa5] text-white font-medium py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]"
            >
              Select
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SelectCharaters