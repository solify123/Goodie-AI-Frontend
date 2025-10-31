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
      className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-[18rem] h-[22rem] sm:h-[24rem] bg-gradient-to-b from-pink-200 to-pink-400 rounded-2xl flex flex-col items-center justify-center hover:from-pink-300 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
        <Plus className="w-8 h-8 text-pink-500" />
      </div>
      <h3 className="text-white text-xl font-bold">Create new AI</h3>
    </div>
  )
}

const AICharacterCard = ({ ai }: { ai: typeof sampleAIs[0] }) => {
  const navigate = useNavigate()

  const handleChat = () => {
    navigate('/chat')
  }

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-[18rem] h-[22rem] sm:h-[24rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Character Image */}
      <div className="relative w-full h-full">
        <img
          src={ai.image}
          alt={ai.name}
          className="w-full h-full object-cover"
        />

        {/* Chat Icon */}
        <button
          onClick={handleChat}
          className="absolute top-4 right-4 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Character Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
          <h3 className="text-white text-2xl font-bold mb-1">{ai.name}</h3>
          <p className="text-white text-sm mb-3 font-medium">{ai.age} years</p>
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
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500">My AI</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
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
