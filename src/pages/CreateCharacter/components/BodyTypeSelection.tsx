import slim from '../../../assets/images/body/1.jpg'
import muscular from '../../../assets/images/body/2.jpg'
import wide from '../../../assets/images/body/3.jpg'

interface BodyTypeOption {
  value: string
  label: string
  image: string
}

interface BodyTypeSelectionProps {
  selected: string
  onSelect: (value: { value: string; image: string }) => void
}

const BodyTypeSelection = ({ selected, onSelect }: BodyTypeSelectionProps) => {
  const bodyTypes: BodyTypeOption[] = [
    {
      value: 'slim',
      label: 'Slim',
      image: slim
    },
    {
      value: 'muscular',
      label: 'Muscular',
      image: muscular
    },
    {
      value: 'wide',
      label: 'Wide',
      image: wide
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Body Type<span className="text-[#009688]">*</span>
      </h3>
      
      <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
        {bodyTypes.map((bodyType) => (
          <button
            key={bodyType.value}
            onClick={() => onSelect({ value: bodyType.value, image: bodyType.image })}
            className={`group relative transition-all duration-300 cursor-pointer ${
              selected === bodyType.value
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
          >
            {/* Body Type Image */}
            <div className="w-full h-full relative overflow-hidden rounded-lg">
              <img
                src={bodyType.image}
                alt={bodyType.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 py-1 sm:py-1 md:py-2 w-fit mx-auto">
                <div className={`text-center px-1.5 sm:px-2 md:px-3 py-1 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base ${
                  selected === bodyType.value
                    ? 'bg-[#009688] text-white'
                    : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
                }`}>
                  {bodyType.label}
                </div>
              </div>

              {/* Selected Ring */}
              {selected === bodyType.value && (
                <div className="absolute inset-0 rounded-lg ring-2 sm:ring-4 ring-[#009688]"></div>
              )}

              {/* Selected Check Icon */}
              {selected === bodyType.value && (
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-[#009688] rounded-full p-0.5 sm:p-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
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
