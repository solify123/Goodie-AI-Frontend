const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
      {/* Image Area with Character Portrait */}
      <div className="relative h-48 lg:h-56">
        {/* Character Image with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500">
          {/* Character Portrait Placeholder - In a real app, this would be an actual character image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-lg">{character.name[0]}</span>
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${character.gradientClass} opacity-60`}></div>
        
        {isNew && (
          <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            New
          </div>
        )}
      </div>
      
      {/* Text Area */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">
          {character.name} {character.age}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {character.description}
        </p>
      </div>
    </div>
  )
}

const CharacterGrid = () => {
  const characters = [
    {
      name: "Charles",
      age: 49,
      description: "Charles Weston, a distinguished and affluent businessman, is often...",
      gradientClass: "bg-gradient-to-br from-orange-400 to-yellow-500"
    },
    {
      name: "John",
      age: 50,
      description: "Robust and charismatic \"bear\" from America, celebrated for his as-...",
      gradientClass: "bg-gradient-to-br from-amber-600 to-amber-800"
    },
    {
      name: "Erik",
      age: 27,
      description: "Tech-savvy data analyst with interests in sailing, tennis, and fitness.",
      gradientClass: "bg-gradient-to-br from-blue-500 to-blue-800"
    },
    {
      name: "Malik",
      age: 30,
      description: "Fitness coach and jazz music fan, talented in saxophone playing.",
      gradientClass: "bg-gradient-to-br from-gray-400 to-gray-600"
    },
    {
      name: "Ethan",
      age: 25,
      description: "Creative photographer with a passion for capturing life's moments...",
      gradientClass: "bg-gradient-to-br from-pink-400 to-purple-600"
    },
    {
      name: "Victor",
      age: 29,
      description: "Chef and restaurant owner who creates culinary masterpieces...",
      gradientClass: "bg-gradient-to-br from-indigo-500 to-purple-700"
    },
    {
      name: "Jin",
      age: 32,
      description: "Architect with a modern vision and love for sustainable design...",
      gradientClass: "bg-gradient-to-br from-rose-400 to-pink-600"
    },
    {
      name: "Kenji",
      age: 33,
      description: "Musician and songwriter who writes heartfelt melodies...",
      gradientClass: "bg-gradient-to-br from-teal-400 to-green-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {characters.map((character, index) => (
        <CharacterCard 
          key={index} 
          character={character} 
          isNew={index === 0}
        />
      ))}
    </div>
  )
}

export default CharacterGrid
