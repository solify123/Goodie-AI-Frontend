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
      <h3 className="text-white text-center text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 md:mb-8 w-full">
        Choose Style<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect(style.value)}
            className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
              selected === style.value
                ? 'ring-5 ring-pink-500'
                : ''
            }`}
          >
            {/* Style Image */}
            <div className="aspect-[3/4] relative">
              <img
                src={style.image}
                alt={style.label}
                className="w-full h-full object-cover"
              />
              
              {/* Label Badge - Bottom center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
                  selected === style.value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-800/90 text-white'
                }`}>
                  {style.label}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StyleSelection
