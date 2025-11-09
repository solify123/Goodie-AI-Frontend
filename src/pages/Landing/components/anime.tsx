import { useNavigate } from 'react-router-dom'
import characters from './anime.json' with { type: "json" }

const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/chat')
  }

  return (
    <div onClick={handleClick} className="bg-[#1a1a1a] rounded-3xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] transition-all duration-300 cursor-pointer group">
      {/* Image Area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {/* Default Image */}
        <img
          src={character.defaultImage}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
        />
        {/* Hover Image */}
        <img
          src={character.hoverImage}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-10">
            New
          </div>
        )}
        {/* Text Area */}
        <div className="p-3 sm:p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <h3 className="text-white font-bold text-base md:text-[24px] mb-1 font-semibold">
            {character.name} <span className="text-white/70 font-semibold">{character.age}</span>
          </h3>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {character.description}
          </p>
        </div>
      </div>

    </div>
  )
}

const Anime = () => {

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {(characters as any).map((character: any, index: number) => (
          <CharacterCard
            key={index}
            character={character}
            isNew={index === 0}
          />
        ))}
      </div>
    </div>
  )
}

export default Anime