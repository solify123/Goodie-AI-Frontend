interface EyeColorOption {
  value: string
  label: string
  color: string
}

interface EyeColorSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const EyeColorSelection = ({ selected, onSelect }: EyeColorSelectionProps) => {
  const eyeColors: EyeColorOption[] = [
    {
      value: 'brown',
      label: 'Brown',
      color: '#8B4513'
    },
    {
      value: 'blue',
      label: 'Blue',
      color: '#4A90E2'
    },
    {
      value: 'green',
      label: 'Green',
      color: '#50C878'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Eye Color<span className="text-pink-500">*</span>
      </h3>
      
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
        {eyeColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelect(color.value)}
            className={`group relative transition-all duration-300 ${
              selected === color.value
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
          >
            {/* Eye Color Display */}
            <div className="w-20 h-12 sm:w-24 sm:h-15 md:w-32 md:h-20 relative">
              <div 
                className="w-full h-full flex items-center justify-center rounded-xl"
                style={{ 
                  background: `radial-gradient(circle, ${color.color} 0%, ${color.color}dd 50%, #2a2a2a 100%)`
                }}
              >
                {/* Eye Shape SVG */}
                <svg 
                  className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12" 
                  viewBox="0 0 100 50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Eye Outline */}
                  <path
                    d="M 20 25 Q 50 10 80 25 Q 50 40 20 25"
                    fill={color.color}
                    opacity="0.8"
                  />
                  {/* Pupil */}
                  <circle
                    cx="50"
                    cy="25"
                    r="8"
                    fill="#000"
                  />
                  {/* Highlight */}
                  <circle
                    cx="52"
                    cy="23"
                    r="3"
                    fill="#fff"
                    opacity="0.6"
                  />
                </svg>
              </div>
              
              {/* Selected Ring */}
              {selected === color.value && (
                <div className="absolute inset-0 rounded-xl ring-2 sm:ring-4 ring-pink-500"></div>
              )}
            </div>
            
            {/* Label */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selected === color.value
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-700 text-white group-hover:bg-gray-600'
              }`}>
                {color.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EyeColorSelection
