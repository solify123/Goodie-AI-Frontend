interface HairColorOption {
  value: string
  label: string
  color: string
}

interface HairColorSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const HairColorSelection = ({ selected, onSelect }: HairColorSelectionProps) => {
  const hairColors: HairColorOption[] = [
    {
      value: 'blonde',
      label: 'Blonde',
      color: '#F4D03F'
    },
    {
      value: 'brown',
      label: 'Brown',
      color: '#8B4513'
    },
    {
      value: 'black',
      label: 'Black',
      color: '#2C2C2C'
    },
    {
      value: 'ginger',
      label: 'Ginger',
      color: '#CD853F'
    },
    {
      value: 'gray',
      label: 'Gray',
      color: '#808080'
    },
    {
      value: 'white',
      label: 'White',
      color: '#F5F5F5'
    },
    {
      value: 'pink',
      label: 'Pink',
      color: '#FF69B4'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-6">
        Choose Hair Color<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-4 gap-3 max-w-2xl">
        {hairColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelect(color.value)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              selected === color.value
                ? 'bg-pink-500 text-white ring-2 ring-pink-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            style={{
              backgroundColor: selected === color.value ? '#ec4899' : color.color,
              color: color.value === 'white' ? '#000' : '#fff'
            }}
          >
            {color.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HairColorSelection
