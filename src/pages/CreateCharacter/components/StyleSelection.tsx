interface StyleOption {
  value: string
  label: string
  image: string
  description: string
}

interface StyleSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const StyleSelection = ({ selected, onSelect }: StyleSelectionProps) => {
  const styles: StyleOption[] = [
    {
      value: 'realistic',
      label: 'Realistic',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
      description: 'Photorealistic style'
    },
    {
      value: 'anime',
      label: 'Anime',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
      description: 'Anime/manga style'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-6">
        Choose Style<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect(style.value)}
            className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
              selected === style.value
                ? 'ring-4 ring-pink-500 scale-105'
                : 'hover:scale-105 hover:ring-2 hover:ring-gray-600'
            }`}
          >
            {/* Style Image */}
            <div className="aspect-[3/4] relative">
              <img
                src={style.image}
                alt={style.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className={`text-center px-4 py-2 rounded-full font-medium transition-colors ${
                  selected === style.value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700/90 text-white group-hover:bg-gray-600'
                }`}>
                  {style.label}
                </div>
              </div>

              {/* Selected Check Icon */}
              {selected === style.value && (
                <div className="absolute top-4 right-4 bg-pink-500 rounded-full p-2">
                  <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
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

export default StyleSelection
