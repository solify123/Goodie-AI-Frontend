import { useLandingTab } from '../../../contexts/LandingTabContext'

const CharacterCard = ({ character, isNew = false }: { character: any, isNew?: boolean }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] transition-all duration-300 cursor-pointer group">
      {/* Image Area */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        <div 
          className={`w-full h-full ${character.gradientClass} group-hover:scale-110 transition-transform duration-500`}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            New
          </div>
        )}
      </div>
      
      {/* Text Area */}
      <div className="p-3 sm:p-4">
        <h3 className="text-white font-bold text-base sm:text-lg mb-1">
          {character.name} <span className="text-gray-400 font-normal">{character.age}</span>
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {character.description}
        </p>
      </div>
    </div>
  )
}

const CharacterGrid = () => {
  const { activeTab } = useLandingTab()

  const allCharacters = [
    // Guys characters
    {
      name: "Charles",
      age: 49,
      description: "Charles Weston, a distinguished and affluent businessman, is often...",
      gradientClass: "bg-gradient-to-br from-orange-400 to-yellow-500",
      category: "guys"
    },
    {
      name: "John",
      age: 50,
      description: "Robust and charismatic \"bear\" from America, celebrated for his as-...",
      gradientClass: "bg-gradient-to-br from-amber-600 to-amber-800",
      category: "guys"
    },
    {
      name: "Erik",
      age: 27,
      description: "Tech-savvy data analyst with interests in sailing, tennis, and fitness.",
      gradientClass: "bg-gradient-to-br from-blue-500 to-blue-800",
      category: "guys"
    },
    {
      name: "Malik",
      age: 30,
      description: "Fitness coach and jazz music fan, talented in saxophone playing.",
      gradientClass: "bg-gradient-to-br from-gray-400 to-gray-600",
      category: "guys"
    },
    {
      name: "Alex",
      age: 32,
      description: "Creative photographer with a passion for capturing life's moments...",
      gradientClass: "bg-gradient-to-br from-[#26a69a] to-purple-600",
      category: "guys"
    },
    {
      name: "Marcus",
      age: 28,
      description: "Chef and restaurant owner who creates culinary masterpieces...",
      gradientClass: "bg-gradient-to-br from-indigo-500 to-purple-700",
      category: "guys"
    },
    {
      name: "David",
      age: 35,
      description: "Architect with a modern vision and love for sustainable design...",
      gradientClass: "bg-gradient-to-br from-rose-400 to-[#00897b]",
      category: "guys"
    },
    {
      name: "Ryan",
      age: 26,
      description: "Musician and songwriter who writes heartfelt melodies...",
      gradientClass: "bg-gradient-to-br from-teal-400 to-green-600",
      category: "guys"
    },
    // Girls characters
    {
      name: "Emma",
      age: 28,
      description: "Fashion designer and yoga instructor with a passion for sustainable living...",
      gradientClass: "bg-gradient-to-br from-[#80cbc4] to-rose-500",
      category: "girls"
    },
    {
      name: "Sophia",
      age: 32,
      description: "Successful entrepreneur and wellness advocate...",
      gradientClass: "bg-gradient-to-br from-purple-300 to-[#009688]",
      category: "girls"
    },
    {
      name: "Maya",
      age: 25,
      description: "Professional dancer and choreographer...",
      gradientClass: "bg-gradient-to-br from-red-300 to-[#00897b]",
      category: "girls"
    },
    {
      name: "Luna",
      age: 29,
      description: "Talented musician and nature enthusiast...",
      gradientClass: "bg-gradient-to-br from-indigo-300 to-purple-500",
      category: "girls"
    },
    // Anime characters
    {
      name: "Kenji",
      age: 22,
      description: "Swordsman from the ancient realm seeking justice...",
      gradientClass: "bg-gradient-to-br from-cyan-400 to-blue-600",
      category: "anime"
    },
    {
      name: "Sakura",
      age: 19,
      description: "Magical girl with incredible powers and a kind heart...",
      gradientClass: "bg-gradient-to-br from-[#26a69a] to-rose-600",
      category: "anime"
    },
    {
      name: "Ren",
      age: 24,
      description: "Ninja warrior with extraordinary agility...",
      gradientClass: "bg-gradient-to-br from-purple-400 to-indigo-600",
      category: "anime"
    },
    {
      name: "Yuki",
      age: 20,
      description: "Ice mage controlling the elements...",
      gradientClass: "bg-gradient-to-br from-blue-300 to-cyan-500",
      category: "anime"
    }
  ]

  const filteredCharacters = allCharacters.filter(char => char.category === activeTab)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredCharacters.map((character, index) => (
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

export default CharacterGrid
