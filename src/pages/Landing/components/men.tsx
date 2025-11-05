import m_1_1 from '../../../assets/images/persons/m_1_1.png'
import m_1_2 from '../../../assets/images/persons/m_1_2.png'
import m_2_1 from '../../../assets/images/persons/m_2_1.png'
import m_2_2 from '../../../assets/images/persons/m_2_2.png'
import m_3_1 from '../../../assets/images/persons/m_3_1.png'
import m_3_2 from '../../../assets/images/persons/m_3_2.png'
import m_4_1 from '../../../assets/images/persons/m_4_1.png'
import m_4_2 from '../../../assets/images/persons/m_4_2.png'
import m_5_1 from '../../../assets/images/persons/m_5_1.png'
import m_5_2 from '../../../assets/images/persons/m_5_2.png'
import m_6_1 from '../../../assets/images/persons/m_6_1.png'
import m_6_2 from '../../../assets/images/persons/m_6_2.png'
import m_7_1 from '../../../assets/images/persons/m_7_1.png'
import m_7_2 from '../../../assets/images/persons/m_7_2.png'
import m_8_1 from '../../../assets/images/persons/m_8_1.png'
import m_8_2 from '../../../assets/images/persons/m_8_2.png'
import m_9_1 from '../../../assets/images/persons/m_9_1.png'
import m_9_2 from '../../../assets/images/persons/m_9_2.png'
import m_10_1 from '../../../assets/images/persons/m_10_1.png'
import m_10_2 from '../../../assets/images/persons/m_10_2.png'
import m_11_1 from '../../../assets/images/persons/m_11_1.png'
import m_11_2 from '../../../assets/images/persons/m_11_2.png'
import { useNavigate } from 'react-router-dom'

const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/chat')
  }

  return (
    <div onClick={handleClick} className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] transition-all duration-300 cursor-pointer group">
      {/* Image Area */}
      <div className="relative h-88 sm:h-94 lg:h-102 overflow-hidden">
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

const Men = () => {
  const characters = [
    {
      name: "Charles",
      age: 49,
      description: "Charles Weston, a distinguished and affluent businessman, is often...",
      defaultImage: m_1_1,
      hoverImage: m_1_2,
    },
    {
      name: "John",
      age: 50,
      description: "Robust and charismatic \"bear\" from America, celebrated for his as-...",
      defaultImage: m_2_1,
      hoverImage: m_2_2,
    },
    {
      name: "Erik",
      age: 27,
      description: "Tech-savvy data analyst with interests in sailing, tennis, and fitness.",
      defaultImage: m_3_1,
      hoverImage: m_3_2,
    },
    {
      name: "Malik",
      age: 30,
      description: "Fitness coach and jazz music fan, talented in saxophone playing.",
      defaultImage: m_4_1,
      hoverImage: m_4_2,
    },
    {
      name: "Alex",
      age: 32,
      description: "Creative photographer with a passion for capturing life's moments...",
      defaultImage: m_5_1,
      hoverImage: m_5_2,
    },
    {
      name: "David",
      age: 35,
      description: "Architect with a modern vision and love for sustainable design...",
      defaultImage: m_6_1,
      hoverImage: m_6_2,
    },
    {
      name: "Ryan",
      age: 26,
      description: "Musician and songwriter who writes heartfelt melodies...",
      defaultImage: m_7_1,
      hoverImage: m_7_2,
    },
    {
      name: "William",
      age: 31,
      description: "Software engineer and tech entrepreneur with a passion for innovation...",
      defaultImage: m_8_1,
      hoverImage: m_8_2,
    },
    {
      name: "James",
      age: 29,
      description: "Software engineer and tech entrepreneur with a passion for innovation...",
      defaultImage: m_9_1,
      hoverImage: m_9_2,
    },
    {
      name: "Noah",
      age: 35,
      description: "Architect with a modern vision and love for sustainable design...",
      defaultImage: m_10_1,
      hoverImage: m_10_2,
    },
    {
      name: "Lucas",
      age: 26,
      description: "Musician and songwriter who writes heartfelt melodies...",
      defaultImage: m_11_1,
      hoverImage: m_11_2,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {characters.map((character, index) => (
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

export default Men