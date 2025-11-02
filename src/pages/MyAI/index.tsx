import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout'

// Sample AI character data - in a real app this would come from an API
const sampleAIs = [
  {
    id: 1,
    name: 'Arthur Murphy',
    age: 30,
    description: 'Passionate dancer and avid gamer, blending rhythm and strategy in every move he makes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
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
      className="cursor-pointer w-full aspect-[3/4] max-w-[300px] bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 rounded-2xl flex flex-col items-center justify-center hover:from-pink-300 hover:via-pink-400 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Plus className="w-10 h-10 text-pink-500" />
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
    <div className="relative w-full aspect-[3/4] max-w-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Character Image */}
      <div className="relative w-full h-full">
        <img 
          src={ai.image} 
          alt={ai.name}
          className="w-full h-full object-cover"
        />
        
        {/* Chat Bubble Icon - small in top right */}
        <button
          onClick={handleChat}
          className="absolute top-3 right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors shadow-lg z-10"
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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-white">My</span>{' '}
              <span className="text-pink-500">AI</span>
            </h1>
          </div>

          {/* Cards - Horizontal layout */}
          <div className="flex flex-wrap gap-6 sm:gap-8 items-start">
            <CreateNewAICard />
            {sampleAIs.map((ai) => (
              <AICharacterCard key={ai.id} ai={ai} />
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default MyAIPage
