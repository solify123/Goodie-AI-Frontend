import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../../contexts/GlobalContext'
import { useChats } from '../../../hooks/useChats'
import { toast } from 'sonner';

const CharacterCard = ({ character, isNew }: { character: any; isNew: boolean }) => {
  const navigate = useNavigate()
  const { startChatFromCharacter } = useGlobalContext()
  const { createChat } = useChats()

  const handleClick = async () => {
    let response = await createChat(character.introduction || character.description || '', character.id)
    if (response.success) {
      toast.success(response.message)
      startChatFromCharacter({
        name: character.name,
        avatar: character.imgUrl,
        description: character.introduction || character.description,
        characterId: character.id
      })
      navigate('/chat')
    } else {
      toast.error(response.message)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-[#1a1a1a] rounded-3xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] transition-all duration-300 cursor-pointer group"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          src={character.imgUrl}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500"
        />
        <img
          src={character.imgUrl}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#00bfa5] to-[#00897b] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-10">
            New
          </div>
        )}
        <div className="p-3 sm:p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <h3 className="text-white font-bold text-base md:text-[24px] mb-1 font-semibold">
            {character.name} <span className="text-white/70 font-semibold">{character.attributes.age}</span>
          </h3>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {character.introduction}
          </p>
        </div>
      </div>
    </div>
  )
}

const CharacterGrid = ({ characters }: { characters: any[] }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {characters.map((character, index) => (
        <CharacterCard key={`${character.name}-${index}`} character={character} isNew={index === 0} />
      ))}
    </div>
  </div>
)

export const GirlsGrid = ({ characters }: { characters: any[] }) => <CharacterGrid characters={characters.filter((character: any) => character.attributes.gender === 'girls' && character.attributes.style === 'realistic')} />
export const MenGrid = ({ characters }: { characters: any[] }) => <CharacterGrid characters={characters.filter((character: any) => character.attributes.gender === 'guys' && character.attributes.style === 'realistic')} />
export const AnimeGrid = ({ characters }: { characters: any[] }) => <CharacterGrid characters={characters.filter((character: any) => character.attributes.style === 'anime')} />

export default CharacterGrid

