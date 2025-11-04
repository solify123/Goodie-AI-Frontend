
interface AgeSliderProps {
  value: number
  onChange: (value: number) => void
}

const AgeSlider = ({ value, onChange }: AgeSliderProps) => {
  const minAge = 18
  const maxAge = 35

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Age
      </h3>
      
      <div className="px-2 sm:px-4">
        {/* Current Value Display */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-2xl sm:text-3xl min-w-[80px] sm:min-w-[100px] text-center shadow-lg shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]">
            {value}
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={minAge}
            max={maxAge}
            value={value}
            onChange={handleChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((value - minAge) / (maxAge - minAge)) * 100}%, #374151 ${((value - minAge) / (maxAge - minAge)) * 100}%, #374151 100%)`
            }}
          />
          
          {/* Min and Max Labels */}
          <div className="flex justify-between mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm">
            <span>{minAge}</span>
            <span>{maxAge}</span>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        @media (min-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
          
          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  )
}

export default AgeSlider
