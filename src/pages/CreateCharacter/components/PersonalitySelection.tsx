interface PersonalityOption {
  value: string
  label: string
  icon: string
  description: string
}

interface PersonalitySelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const PersonalitySelection = ({ selected, onSelect }: PersonalitySelectionProps) => {
  const personalities: PersonalityOption[] = [
    {
      value: 'protector',
      label: 'Protector',
      icon: '🛡️',
      description: 'Like a personal guardian, he\'s always ready to stand up for his friends.'
    },
    {
      value: 'sage',
      label: 'Sage',
      icon: '🧙',
      description: 'He\'s the "wise old man" in a young person\'s body, always knowing what to say.'
    },
    {
      value: 'hero',
      label: 'Hero',
      icon: '🦸',
      description: 'Brave and bold, he\'s the guy who\'s not afraid to stand up for what\'s right.'
    },
    {
      value: 'jester',
      label: 'Jester',
      icon: '🤡',
      description: 'He\'s the class clown, always cracking jokes and making everyone laugh.'
    },
    {
      value: 'toy_boy',
      label: 'Toy Boy',
      icon: '💘',
      description: 'He\'s got a way with flirting that seems to charm just about anyone.'
    },
    {
      value: 'dominant',
      label: 'Dominant',
      icon: '👑',
      description: 'Takes the lead in any dance of life, always at the front of the pack.'
    },
    {
      value: 'submissive',
      label: 'Submissive',
      icon: '💔',
      description: 'Happy to follow and let others light the path, content in the supporting role.'
    },
    {
      value: 'lover',
      label: 'Lover',
      icon: '❤️',
      description: 'He\'s all about romance, like he stepped out of a Valentine\'s card.'
    },
    {
      value: 'beast',
      label: 'Beast',
      icon: '🐻',
      description: 'Tough and competitive, he loves to win and never gives up.'
    },
    {
      value: 'confidant',
      label: 'Confidant',
      icon: '🤝',
      description: 'He\'s the secret-keeper, the one everyone trusts with their gossip and worries.'
    },
    {
      value: 'rebel',
      label: 'Rebel',
      icon: '⚡',
      description: 'He likes to break the rules and do things his own unique way.'
    },
    {
      value: 'scholar',
      label: 'Scholar',
      icon: '🎓',
      description: 'He\'s a walking encyclopedia, always buried in books and acing the tests.'
    }
  ]

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-6 text-center">
        Choose Personality<span className="text-pink-500">*</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {personalities.map((personality) => (
          <button
            key={personality.value}
            onClick={() => onSelect(personality.value)}
            className={`group relative p-4 rounded-lg transition-all duration-300 ${
              selected === personality.value
                ? 'bg-pink-500/20 ring-2 ring-pink-500'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {/* Icon */}
            <div className="text-3xl mb-3 text-center">
              {personality.icon}
            </div>
            
            {/* Title */}
            <div className="text-white font-semibold text-center mb-2">
              {personality.label}
            </div>
            
            {/* Description */}
            <div className="text-gray-300 text-sm text-center leading-relaxed">
              {personality.description}
            </div>

            {/* Selected Check Icon */}
            {selected === personality.value && (
              <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PersonalitySelection
