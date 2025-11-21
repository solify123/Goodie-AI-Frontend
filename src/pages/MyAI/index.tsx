import { useState, useEffect } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'
import { useCharacter } from '../../hooks/useCharacter'
import { toast } from 'sonner'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useChats } from '../../hooks/useChats'
import { API_CONFIG } from '../../config/api.config'
import useMyAI from '../../hooks/useMyAI'

interface Character {
  id: string
  name: string
  attributes: any
  age?: number
  introduction?: string
  description?: string
  imgUrl?: string
  isOnline?: boolean
}

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

const AICharacterCard = ({ ai }: { ai: Character }) => {
  const navigate = useNavigate()
  const { startChatFromCharacter } = useGlobalContext()
  
  const handleChat = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const { createChat } = useChats()
    let response = await createChat(ai.introduction || ai.description || '', ai.id)
    if (response.success) {
      if (response.message.includes('already exists')) {
        toast.warning(response.message)
      } else {
        toast.success(response.message)
        startChatFromCharacter({
          name: ai.name,
          avatar: ai.imgUrl || (ai?.attributes?.gender !== "girls" ? API_CONFIG.DEFAULT_MALE_IMAGE : API_CONFIG.DEFAULT_FEMALE_IMAGE),
          description: ai.introduction || ai.description || '',
          characterId: ai.id
        })
        navigate('/chat')
      }
    } else {
      toast.error(response.message)
    }
  }

  // Get image with fallback to default
  const characterImage = ai.imgUrl || (ai?.attributes?.gender !== "girls" ? API_CONFIG.DEFAULT_MALE_IMAGE : API_CONFIG.DEFAULT_FEMALE_IMAGE)
  
  // Get age from attributes or direct property
  const characterAge = ai.age || ai.attributes?.age || null

  // Get description/introduction
  const characterDescription = ai.introduction || ai.description || ''

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Character Image */}
      <div className="relative w-full h-full" onClick={handleChat}>
        <img
          src={characterImage}
          alt={ai.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            // Fallback to default image if image fails to load
            const target = e.target as HTMLImageElement
            if (target.src !== (ai?.attributes?.gender !== "girls" ? API_CONFIG.DEFAULT_MALE_IMAGE : API_CONFIG.DEFAULT_FEMALE_IMAGE)) {
              target.src = (ai?.attributes?.gender !== "girls" ? API_CONFIG.DEFAULT_MALE_IMAGE : API_CONFIG.DEFAULT_FEMALE_IMAGE)
            }
          }}
        />

        {/* Chat Bubble Icon - small in top right */}
        <button
          onClick={handleChat}
          className="absolute cursor-pointer top-3 right-3 w-8 h-8 bg-[#009688] rounded-full flex items-center justify-center hover:bg-[#00897b] transition-colors shadow-lg z-10"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Character Info Overlay - dark overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 sm:p-6">
          <h3 className="text-white text-2xl font-bold mb-1">{ai.name}</h3>
          {characterAge && (
            <p className="text-white text-sm mb-2 font-medium">{characterAge} years</p>
          )}
          {characterDescription && (
            <p className="text-white text-sm leading-relaxed">{characterDescription}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const MyAIPage = () => {
  const { getCharacters } = useCharacter()
  const { getMyAI } = useMyAI()
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyAI = async () => {
      const response = await getMyAI()
      if (response.success && response.data) {
        console.log(response.data, "response.data")
        setCharacters(response.data)
      }
    }
    fetchMyAI()
  }, [])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true)
        const response = await getCharacters()
        if (response.success && response.data) {
          // Transform the data to match our Character interface
          const transformedCharacters = (Array.isArray(response.data) ? response.data : []).map((char: any) => ({
            id: char.id || String(Date.now() + Math.random()),
            name: char.name || 'Character',
            age: char.attributes?.age || char.age,
            attributes: char.attributes,
            introduction: char.introduction || char.description,
            description: char.description || char.introduction,
            imgUrl: char.imgUrl || char.image,
            isOnline: char.isOnline || false
          }))
          setCharacters(transformedCharacters)
        }
      } catch (error: any) {
        console.error('Error fetching characters:', error)
        toast.error('Failed to load characters. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()
  }, [])

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#009688]" />
          </div>
        ) : (
          /* Cards - Horizontal layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
            <CreateNewAICard />
            {characters.length > 0 ? (
              characters.map((ai) => (
                <AICharacterCard key={ai.id} ai={ai} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No characters yet. Create your first AI character!</p>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNavigation />
    </Layout>
  )
}

export default MyAIPage
