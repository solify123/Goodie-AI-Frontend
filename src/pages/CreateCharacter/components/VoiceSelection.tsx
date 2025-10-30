interface VoiceOption {
  value: string
  label: string
}

interface VoiceSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const VoiceSelection = ({ selected, onSelect }: VoiceSelectionProps) => {
  const voices: VoiceOption[] = [
    { value: 'voice1', label: 'Voice 1' },
    { value: 'voice2', label: 'Voice 2' },
    { value: 'voice3', label: 'Voice 3' },
    { value: 'voice4', label: 'Voice 4' },
    { value: 'voice5', label: 'Voice 5' },
    { value: 'voice6', label: 'Voice 6' },
    { value: 'voice7', label: 'Voice 7' },
    { value: 'voice8', label: 'Voice 8' },
    { value: 'voice9', label: 'Voice 9' }
  ]

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-6 text-center">
        Choose Voice<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {voices.map((voice) => (
          <button
            key={voice.value}
            onClick={() => onSelect(voice.value)}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              selected === voice.value
                ? 'bg-pink-500 text-white ring-2 ring-pink-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {/* Speaker Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343a1 1 0 00-1.414 1.414L10.586 12l-5.657 5.657a1 1 0 101.414 1.414L12 13.414l5.657 5.657a1 1 0 001.414-1.414L13.414 12l5.657-5.657a1 1 0 00-1.414-1.414L12 10.586 6.343 4.929z" />
            </svg>
            
            {/* Voice Label */}
            <span>{voice.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default VoiceSelection
