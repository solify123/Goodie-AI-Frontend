
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
      <h3 className="text-white text-xl font-semibold mb-6">
        Choose Age
      </h3>
      
      <div className="px-4">
        {/* Current Value Display */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-3xl min-w-[100px] text-center shadow-lg shadow-pink-500/30">
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
          <div className="flex justify-between mt-4 text-gray-400 text-sm">
            <span>{minAge}</span>
            <span>{maxAge}</span>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  )
}

export default AgeSlider
