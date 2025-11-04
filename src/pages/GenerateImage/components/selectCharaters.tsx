import { Sparkles, Shell, ArrowLeft, Venus, Mars, Telescope, HeartPulse, ImageDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface SelectCharatersProps {
  setSelectCharater: (value: boolean) => void
}

const SelectCharaters = ({ setSelectCharater }: SelectCharatersProps) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'girls' | 'anime' | 'guys'>('guys')
  const [activeDiscoveryTab, setActiveDiscoveryTab] = useState<'discovery' | 'myAI'>('discovery')
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  
  const girlsCharacters = [
    { id: 1, name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face' },
    { id: 2, name: 'Emma', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face' },
    { id: 3, name: 'Olivia', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face' },
    { id: 4, name: 'Sophia', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face' },
    { id: 5, name: 'Isabella', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face' },
    { id: 6, name: 'Mia', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face' },
    { id: 7, name: 'Charlotte', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=400&fit=crop&crop=face' },
  ]

  const animeCharacters = [
    { id: 1, name: 'Sakura', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=300&h=400&fit=crop&crop=face' },
    { id: 2, name: 'Aiko', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=400&fit=crop&crop=face' },
    { id: 3, name: 'Yuki', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=400&fit=crop&crop=face' },
    { id: 4, name: 'Hana', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face' },
    { id: 5, name: 'Mei', image: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=300&h=400&fit=crop&crop=face' },
    { id: 6, name: 'Kira', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop&crop=face' },
    { id: 7, name: 'Luna', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop&crop=face' },
    { id: 8, name: 'Rin', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face' }
  ]

  const guysCharacters = [
    { id: 1, name: 'Charles', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face' },
    { id: 2, name: 'Erik', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face' },
    { id: 3, name: 'John', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face' },
    { id: 4, name: 'Malik', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face' },
    { id: 5, name: 'Victor', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face' },
    { id: 6, name: 'Ethan', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face' },
    { id: 7, name: 'Jin', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face' },
    { id: 8, name: 'Kenji', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop&crop=face' }
  ]

  const myAICharacters = [
    { id: 1, name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face' },
    { id: 2, name: 'Emma', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face' },
    { id: 3, name: 'Olivia', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face' },
    { id: 4, name: 'Sophia', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face' },
    { id: 5, name: 'Isabella', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face' },
    { id: 6, name: 'Mia', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face' },
  ]

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
                  className={`aspect-[3/4] relative rounded-[1.2rem] overflow-hidden transition-all duration-300 cursor-pointer group ${
                    selectedCharacter === character.id 
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
                  className={`absolute bottom-3 left-3 right-3 z-10 mt-3 px-4 py-2 rounded-full text-white font-medium text-sm text-center transition-all duration-300 cursor-pointer backdrop-blur border ${
                    selectedCharacter === character.id 
                      ? 'bg-[#009688]/60 border-[#009688]/50 shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]' 
                      : 'bg-black/30 hover:bg-white/15 border-white/20'
                   }`}
                >
                  {character.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SelectCharaters