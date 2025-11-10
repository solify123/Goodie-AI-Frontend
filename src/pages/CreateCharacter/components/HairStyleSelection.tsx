interface HairStyleOption {
  value: string
  label: string
  image: string
}

interface HairStyleSelectionProps {
  selected: string
  onSelect: (value: { value: string; image: string }) => void
}

const HairStyleSelection = ({ selected, onSelect }: HairStyleSelectionProps) => {
  const hairStyles: HairStyleOption[] = [
    {
      value: 'buzz-cut',
      label: 'Buzz cut',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/buzz_cut-1601bf98b9bbcd6d7e2f9652ef71f094382a05c6c9d4620ee5fe2b6983dd7e23.webp'
    },
    {
      value: 'long',
      label: 'Long',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/long-b2542c461e0c89049d56342907da18ab5370ce9438ae39f7174d4e164012be5e.webp'
    },
    {
      value: 'slicked-back',
      label: 'Slicked Back',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/slicked_back-28722d0ad4441c1d8b086fcaf466495e9d9b427f0486b7969b60fd71145270ed.webp'
    },
    {
      value: 'short',
      label: 'Short',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/short-d92b15523423874797de92201b7e5ee1fffb6810ce60fd9ad3048bc46591b8f5.webp'
    },
    {
      value: 'bun',
      label: 'Bun',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/bun-425aeb09eb23dcf2445b1e6031b471bcb62f75970e3c066c7305153e503bf335.webp'
    },
    {
      value: 'dreadlocks',
      label: 'Dreadlocks',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/dreadlocks-526e2ad0f05b1731ecf7c3981499c14803edcf87c217d62b2864a11605e0dcbd.webp'
    },
    {
      value: 'curly',
      label: 'Curly',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/curly-903730838fd306a7d177eb5ea57e7b412b38495f6f72d93c1447c5f4f688842a.webp'
    },
    {
      value: 'bald',
      label: 'Bald',
      image: 'https://candy.ai/assets/create-char/step-3/male/realistic/bald-a0d5209fee7d63aced22b3e9b587fa3da9c331823c3066258df9b9ef948257fe.webp'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Hair Style<span className="text-[#009688]">*</span>
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-center">
        {hairStyles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect({ value: style.value, image: style.image })}
            className={`group relative cursor-pointer transition-all duration-300 ${
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
                <div className="absolute inset-0 rounded-lg ring-2 sm:ring-4 ring-[#009688]"></div>
              )}

              {/* Selected Check Icon */}
              {selected === style.value && (
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-[#009688] rounded-full p-0.5 sm:p-1">
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
                  ? 'bg-[#009688] text-white'
                  : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
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
