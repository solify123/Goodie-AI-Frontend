interface EthnicityOption {
  value: string
  label: string
  image: string
}

interface EthnicitySelectionProps {
  selected: string
  onSelect: (value: { value: string; image: string }) => void
}

const EthnicitySelection = ({ selected, onSelect }: EthnicitySelectionProps) => {
  const ethnicities: EthnicityOption[] = [
    {
      value: 'caucasian',
      label: 'Caucasian',
      image: 'https://candy.ai/assets/create-char/step-2/male/realistic/caucasian-ed56574f5d51f25a23fc0d1d43e59db692008f431ced30660853cbd2a8ce055c.webp'
    },
    {
      value: 'latino',
      label: 'Latino',
      image: 'https://candy.ai/assets/create-char/step-2/male/realistic/latino-cf3c1d87cf1dcb9922a312d287790ce15476aa107b7f3f8f20aa778bca6fa932.webp'
    },
    {
      value: 'asian',
      label: 'Asian',
      image: 'https://candy.ai/assets/create-char/step-2/male/realistic/asian-a6c32f7e7618c3c6883f85d60b354179ec1b0a9b992a05ae1df2eebd9d39c4e4.webp'
    },
    {
      value: 'arab',
      label: 'Arab',
      image: 'https://candy.ai/assets/create-char/step-2/male/realistic/arab-846c6d54e5307a1fa43a74423bba76614163a7fa628917b48cffda7b29650513.webp'
    },
    {
      value: 'black-afro',
      label: 'Black/Afro',
      image: 'https://candy.ai/assets/create-char/step-2/male/realistic/black_afro-2e24fc8677fdc96aeb25ad784f06be3c44af4a42749b14e7ce36f879dc6d093c.webp'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Ethnicity<span className="text-[#009688]">*</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
        {ethnicities.map((ethnicity) => (
          <button
            key={ethnicity.value}
            onClick={() => onSelect({ value: ethnicity.value, image: ethnicity.image })}
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
                <div className="absolute inset-0 rounded-full ring-2 sm:ring-4 ring-[#009688]"></div>
              )}
            </div>
            
            {/* Label */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selected === ethnicity.value
                  ? 'bg-[#009688] text-white'
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
