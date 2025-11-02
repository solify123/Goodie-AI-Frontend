// import m_1_1 from '../../../assets/images/persons/m_1_1.png'
// import m_1_2 from '../../../assets/images/persons/m_1_2.png'
// import m_2_1 from '../../../assets/images/persons/m_2_1.png'
// import m_2_2 from '../../../assets/images/persons/m_2_2.png'
// import m_3_1 from '../../../assets/images/persons/m_3_1.png'
// import m_3_2 from '../../../assets/images/persons/m_3_2.png'
// import m_4_1 from '../../../assets/images/persons/m_4_1.png'
// import m_4_2 from '../../../assets/images/persons/m_4_2.png'
// import m_5_1 from '../../../assets/images/persons/m_5_1.png'
// import m_5_2 from '../../../assets/images/persons/m_5_2.png'
// import m_6_1 from '../../../assets/images/persons/m_6_1.png'
// import m_6_2 from '../../../assets/images/persons/m_6_2.png'
// import m_7_1 from '../../../assets/images/persons/m_7_1.png'
// import m_7_2 from '../../../assets/images/persons/m_7_2.png'
// import m_8_1 from '../../../assets/images/persons/m_8_1.png'
// import m_8_2 from '../../../assets/images/persons/m_8_2.png'

const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer group">
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
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg z-10">
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
  const characters = [
    {
      name: "Emma",
      age: 28,
      description: "Fashion designer and yoga instructor with a passion for sustainable living...",
      defaultImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Sophia",
      age: 32,
      description: "Successful entrepreneur and wellness advocate...",
      defaultImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Maya",
      age: 25,
      description: "Professional dancer and choreographer...",
      defaultImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Luna",
      age: 29,
      description: "Talented musician and nature enthusiast...",
      defaultImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Isabella",
      age: 26,
      description: "Creative artist and coffee enthusiast with a love for vintage fashion...",
      defaultImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Olivia",
      age: 30,
      description: "Fitness instructor and health coach passionate about wellness...",
      defaultImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face",
    },
    {
      name: "Ava",
      age: 27,
      description: "Graphic designer and digital artist with an eye for aesthetics...",
      defaultImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=400&fit=crop&crop=face",
      hoverImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=400&fit=crop&crop=face",
    }
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

export default Girls