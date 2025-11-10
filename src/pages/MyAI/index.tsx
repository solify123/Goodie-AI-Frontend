import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'

// Sample AI character data - in a real app this would come from an API
const sampleAIs = [
  {
    id: 1,
    name: 'Arthur Murphy',
    age: 30,
    description: 'Passionate dancer and avid gamer, blending rhythm and strategy in every move he makes.',
    image: 'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
    isOnline: true
  }
]

const CreateNewAICard = () => {
  const navigate = useNavigate()

  const handleCreateNew = () => {
    navigate('/create-character')
  }

  return (
    <div 
      onClick={handleCreateNew}
      className="cursor-pointer w-full py-5 sm:aspect-[3/4] bg-gradient-to-b from-[#b2dfdb] via-[#80cbc4] to-[#26a69a] rounded-2xl flex flex-col items-center justify-center hover:from-[#80cbc4] hover:via-[#4db6ac] hover:to-[#009688] transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Plus className="w-10 h-10 text-[#009688]" />
      </div>
      <h3 className="text-white text-xl font-bold">Create new AI</h3>
    </div>
  )
}

const AICharacterCard = ({ ai }: { ai: typeof sampleAIs[0] }) => {
  const navigate = useNavigate()

  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/chat')
  }

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Character Image */}
      <div className="relative w-full h-full" onClick={handleChat}>
        <img 
          src={ai.image} 
          alt={ai.name}
          className="w-full h-full object-cover object-top"
        />
        
        {/* Chat Bubble Icon - small in top right */}
        <button
          className="absolute cursor-pointer top-3 right-3 w-8 h-8 bg-[#009688] rounded-full flex items-center justify-center hover:bg-[#00897b] transition-colors shadow-lg z-10"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Character Info Overlay - dark overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 sm:p-6">
          <h3 className="text-white text-2xl font-bold mb-1">{ai.name}</h3>
          <p className="text-white text-sm mb-2 font-medium">{ai.age} years</p>
          <p className="text-white text-sm leading-relaxed">{ai.description}</p>
        </div>
      </div>
    </div>
  )
}

const MyAIPage = () => {

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-8" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-white">My</span>{' '}
              <span className="text-[#009688]">AI</span>
            </h1>
          </div>

          {/* Cards - Horizontal layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
            <CreateNewAICard />
            {sampleAIs.map((ai) => (
              <AICharacterCard key={ai.id} ai={ai} />
            ))}
          </div>
        </div>
      <BottomNavigation />
    </Layout>
  )
}

export default MyAIPage
