interface BodyTypeOption {
  value: string
  label: string
  image: string
}

interface BodyTypeSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const BodyTypeSelection = ({ selected, onSelect }: BodyTypeSelectionProps) => {
  const bodyTypes: BodyTypeOption[] = [
    {
      value: 'slim',
      label: 'Slim',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=face'
    },
    {
      value: 'muscular',
      label: 'Muscular',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=face'
    },
    {
      value: 'wide',
      label: 'Wide',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=face'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-6 text-center">
        Choose Body Type<span className="text-pink-500">*</span>
      </h3>
      
      <div className="flex justify-center gap-6">
        {bodyTypes.map((bodyType) => (
          <button
            key={bodyType.value}
            onClick={() => onSelect(bodyType.value)}
            className={`group relative transition-all duration-300 ${
              selected === bodyType.value
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
          >
            {/* Body Type Image */}
            <div className="w-48 h-64 relative overflow-hidden rounded-lg">
              <img
                src={bodyType.image}
                alt={bodyType.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className={`text-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  selected === bodyType.value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700/90 text-white group-hover:bg-gray-600'
                }`}>
                  {bodyType.label}
                </div>
              </div>

              {/* Selected Ring */}
              {selected === bodyType.value && (
                <div className="absolute inset-0 rounded-lg ring-4 ring-pink-500"></div>
              )}

              {/* Selected Check Icon */}
              {selected === bodyType.value && (
                <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BodyTypeSelection
