interface EthnicityOption {
  value: string
  label: string
  image: string
}

interface EthnicitySelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const EthnicitySelection = ({ selected, onSelect }: EthnicitySelectionProps) => {
  const ethnicities: EthnicityOption[] = [
    {
      value: 'caucasian',
      label: 'Caucasian',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face'
    },
    {
      value: 'latino',
      label: 'Latino',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=500&fit=crop&crop=face'
    },
    {
      value: 'asian',
      label: 'Asian',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face'
    },
    {
      value: 'arab',
      label: 'Arab',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face'
    },
    {
      value: 'black-afro',
      label: 'Black/Afro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Ethnicity<span className="text-pink-500">*</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
        {ethnicities.map((ethnicity) => (
          <button
            key={ethnicity.value}
            onClick={() => onSelect(ethnicity.value)}
            className={`group relative transition-all duration-300 cursor-pointer ${
              selected === ethnicity.value
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
          >
            {/* Circular Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative">
              <img
                src={ethnicity.image}
                alt={ethnicity.label}
                className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Selected Ring */}
              {selected === ethnicity.value && (
                <div className="absolute inset-0 rounded-full ring-2 sm:ring-4 ring-pink-500"></div>
              )}
            </div>
            
            {/* Label */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selected === ethnicity.value
                  ? 'bg-pink-500 text-white'
                  : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
              }`}>
                {ethnicity.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EthnicitySelection
