interface HairStyleOption {
  value: string
  label: string
  image: string
}

interface HairStyleSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const HairStyleSelection = ({ selected, onSelect }: HairStyleSelectionProps) => {
  const hairStyles: HairStyleOption[] = [
    {
      value: 'buzz-cut',
      label: 'Buzz cut',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'long',
      label: 'Long',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'slicked-back',
      label: 'Slicked Back',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'short',
      label: 'Short',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'bun',
      label: 'Bun',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'dreadlocks',
      label: 'Dreadlocks',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'curly',
      label: 'Curly',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face'
    },
    {
      value: 'bald',
      label: 'Bald',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Hair Style<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {hairStyles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect(style.value)}
            className={`group relative transition-all duration-300 ${
              selected === style.value
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
          >
            {/* Hair Style Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={style.image}
                alt={style.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Selected Ring */}
              {selected === style.value && (
                <div className="absolute inset-0 rounded-lg ring-2 sm:ring-4 ring-pink-500"></div>
              )}

              {/* Selected Check Icon */}
              {selected === style.value && (
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-pink-500 rounded-full p-0.5 sm:p-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Label */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selected === style.value
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-700 text-white group-hover:bg-gray-600'
              }`}>
                {style.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default HairStyleSelection
