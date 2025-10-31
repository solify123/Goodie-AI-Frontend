interface HobbyOption {
  value: string
  label: string
}

interface HobbiesSelectionProps {
  selected: string[]
  onSelect: (values: string[]) => void
}

const HobbiesSelection = ({ selected, onSelect }: HobbiesSelectionProps) => {
  const hobbies: HobbyOption[] = [
    { value: 'fitness', label: 'Fitness' },
    { value: 'weightlifting', label: 'Weightlifting' },
    { value: 'traveling', label: 'Traveling' },
    { value: 'hiking', label: 'Hiking' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'parties', label: 'Parties' },
    { value: 'series', label: 'Series' },
    { value: 'anime', label: 'Anime' },
    { value: 'cosplay', label: 'Cosplay' },
    { value: 'self_development', label: 'Self-Development' },
    { value: 'writing', label: 'Writing' },
    { value: 'camping', label: 'Camping' },
    { value: 'sailing', label: 'Sailing' },
    { value: 'photography', label: 'Photography' },
    { value: 'volunteering', label: 'Volunteering' },
    { value: 'cars', label: 'Cars' },
    { value: 'art', label: 'Art' }
  ]

  const handleToggleHobby = (hobbyValue: string) => {
    if (selected.includes(hobbyValue)) {
      // Remove hobby
      onSelect(selected.filter(h => h !== hobbyValue))
    } else if (selected.length < 3) {
      // Add hobby (max 3)
      onSelect([...selected, hobbyValue])
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center">
        Choose Hobbies<span className="text-pink-500">*</span>
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm text-center mb-4 sm:mb-6">
        You can choose up to 3 variants
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {hobbies.map((hobby) => {
          const isSelected = selected.includes(hobby.value)
          const isDisabled = !isSelected && selected.length >= 3
          
          return (
            <button
              key={hobby.value}
              onClick={() => handleToggleHobby(hobby.value)}
              disabled={isDisabled}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-pink-500 text-white'
                  : isDisabled
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-[#363b4a] text-white hover:bg-[#4a5063]'
              }`}
            >
              {hobby.label}
            </button>
          )
        })}
      </div>
      
      {/* Selection counter */}
      <div className="text-center mt-3 sm:mt-4">
        <span className="text-gray-400 text-xs sm:text-sm">
          {selected.length}/3 selected
        </span>
      </div>
    </div>
  )
}

export default HobbiesSelection
