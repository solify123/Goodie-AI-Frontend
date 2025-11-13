import { useMemo } from 'react'
import girlsData from '../../../config/girls.json' with { type: 'json' }
import menData from '../../../config/men.json' with { type: 'json' }
import animeData from '../../../config/anime.json' with { type: 'json' }
import { useCreateCharacterGender } from '../../../contexts/GlobalContext'
import { API_CONFIG } from '../../../config/api.config'

interface StyleOption {
  value: string
  label: string
  image: string
  description: string
}

interface StyleSelectionProps {
  selected: string
  onSelect: (value: { value: string, image: string }) => void
}

const StyleSelection = ({ selected, onSelect }: StyleSelectionProps) => {
  const { gender } = useCreateCharacterGender()

  const styleImages = useMemo(() => {
    const source =
      gender === 'girls'
        ? girlsData
        : menData

    const animeSource = gender === 'girls' ? animeData?.[0] : animeData?.[34]

    const firstImage = source?.[0]?.defaultImage
    const secondImage = animeSource?.defaultImage

    return {
      realistic: firstImage,
      anime: secondImage,
    }
  }, [gender])

  const styles: StyleOption[] = [
    {
      value: 'realistic',
      label: 'Realistic',
      image:
        styleImages.realistic ??
        'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
      description: 'Photorealistic style',
    },
    {
      value: 'anime',
      label: 'Anime',
      image:
        styleImages.anime ??
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
      description: 'Anime/manga style',
    },
  ]

  return (
    <div>
      <h3 className="text-white text-center text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 md:mb-8 w-full">
        Choose Style<span className="text-[#009688]">*</span>
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect({ value: style.value, image: API_CONFIG.frontendUrl + style.image })}
            className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${selected === style.value
                ? 'ring-5 ring-[#009688]'
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
                <div className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${selected === style.value
                    ? 'bg-[#009688] text-white'
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
