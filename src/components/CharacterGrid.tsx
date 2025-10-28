const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer group">
      {/* Image Area */}
      <div className="relative h-56 lg:h-64 overflow-hidden">
        <div 
          className={`w-full h-full ${character.gradientClass} group-hover:scale-110 transition-transform duration-500`}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            New
          </div>
        )}
      </div>
      
      {/* Text Area */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-1">
          {character.name} <span className="text-gray-400 font-normal">{character.age}</span>
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
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
      name: "Alex",
      age: 32,
      description: "Creative photographer with a passion for capturing life's moments...",
      gradientClass: "bg-gradient-to-br from-pink-400 to-purple-600"
    },
    {
      name: "Marcus",
      age: 28,
      description: "Chef and restaurant owner who creates culinary masterpieces...",
      gradientClass: "bg-gradient-to-br from-indigo-500 to-purple-700"
    },
    {
      name: "David",
      age: 35,
      description: "Architect with a modern vision and love for sustainable design...",
      gradientClass: "bg-gradient-to-br from-rose-400 to-pink-600"
    },
    {
      name: "Ryan",
      age: 26,
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
