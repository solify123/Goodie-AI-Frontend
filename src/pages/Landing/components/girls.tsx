import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import characters from './girls.json' with { type: "json" }

const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = () => {
    navigate('/chat')
  }

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error)
      })
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] transition-all duration-300 cursor-pointer group"
    >
      {/* Image Area */}
      <div className="relative h-88 sm:h-94 lg:h-102 overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src={character.videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        ></video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-10">
            New
          </div>
        )}
        {/* Text Area */}
        <div className="p-3 sm:p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <h3 className="text-white font-bold text-base sm:text-lg mb-1">
            {character.name} <span className="text-gray-400 font-normal">{character.age}</span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {character.description}
          </p>
        </div>
      </div>

    </div>
  )
}

const Girls = () => {

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {characters.map((character: any, index: number) => (
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

export default Girls