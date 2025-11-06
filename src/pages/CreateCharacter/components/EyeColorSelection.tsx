import eyeColorBrown from '../../../assets/images/eyes/eye-color-brown.png'
import eyeColorBlue from '../../../assets/images/eyes/eye-color-blue.png'
import eyeColorGreen from '../../../assets/images/eyes/eye-color-green.png'

interface EyeColorOption {
  value: string
  label: string
  image: string
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
      image: eyeColorBrown
    },
    {
      value: 'blue',
      label: 'Blue',
      image: eyeColorBlue
    },
    {
      value: 'green',
      label: 'Green',
      image: eyeColorGreen
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Eye Color<span className="text-[#009688]">*</span>
      </h3>
      
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
        {eyeColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelect(color.value)}
            className="group relative cursor-pointer transition-all duration-300"
          >
            {/* Eye Color Display with Label */}
            <div className="relative">
              <div className="relative w-[126px] h-[56px] rounded-2xl overflow-hidden">
                <img 
                  src={color.image} 
                  alt={color.label + " Eye Color"} 
                  className="w-full h-full object-cover"
                  />
              
                {/* Selected Border */}
              {selected === color.value && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#009688]"></div>
              )}
            </div>
            
              {/* Label - overlapping at bottom */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`bg-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selected === color.value
                    ? 'bg-[#009688] text-white'
                    : 'bg-gray-200 text-gray-500 text-white'
              }`}>
                {color.label}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EyeColorSelection
