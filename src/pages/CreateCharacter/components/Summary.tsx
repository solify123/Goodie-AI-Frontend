import { 
  User, 
  Eye, 
  Scissors, 
  Activity, 
  Heart, 
  Volume2, 
  Briefcase, 
  Gamepad2, 
  Shirt
} from 'lucide-react'

interface SummaryProps {
  characterData: {
    style: string
    ethnicity: string
    age: number
    eyeColor: string
    hairColor: string
    hairStyle: string
    bodyType: string
    height: number
    skinTone: string
    personality: string
    voice: string
    interests: string[]
    occupation: string
    hobbies: string[]
    fashionStyle: string
    relationship: string
    clothing: string
  }
  onPrevious: () => void
  onComplete: () => void
}

const Summary = ({ characterData, onPrevious, onComplete }: SummaryProps) => {
  const getStyleImage = (style: string) => {
    switch (style.toLowerCase()) {
      case 'realistic':
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
        </div>
      case 'cartoon':
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-800" />
        </div>
      default:
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
        </div>
    }
  }

  const getEthnicityImage = (ethnicity: string) => {
    switch (ethnicity.toLowerCase()) {
      case 'asian':
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-800" />
        </div>
      case 'caucasian':
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-200 to-pink-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-pink-800" />
        </div>
      case 'african':
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
        </div>
      default:
        return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
        </div>
    }
  }

  const getEyeColorImage = (eyeColor: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'from-blue-200 to-blue-400',
      'brown': 'from-amber-200 to-amber-400',
      'green': 'from-green-200 to-green-400',
      'hazel': 'from-yellow-200 to-yellow-400',
      'gray': 'from-gray-200 to-gray-400'
    }
    const gradient = colorMap[eyeColor.toLowerCase()] || 'from-gray-200 to-gray-400'
    
    return <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
      <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
    </div>
  }

  const getHairStyleImage = () => {
    return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg flex items-center justify-center">
      <Scissors className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />
    </div>
  }

  const getBodyTypeImage = () => {
    return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg flex items-center justify-center">
      <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-orange-800" />
    </div>
  }

  const getPersonalityIcon = () => {
    return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-200 to-pink-400 rounded-lg flex items-center justify-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-full flex items-center justify-center">
        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </div>
    </div>
  }

  const getRelationshipIcon = () => {
    return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg flex items-center justify-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center">
        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </div>
    </div>
  }

  const getVoiceIcon = () => {
    return <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
      <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
    </div>
  }

  const summaryItems = [
    {
      label: 'Style',
      value: characterData.style,
      image: getStyleImage(characterData.style),
      displayValue: characterData.style.charAt(0).toUpperCase() + characterData.style.slice(1)
    },
    {
      label: 'Ethnicity',
      value: characterData.ethnicity,
      image: getEthnicityImage(characterData.ethnicity),
      displayValue: characterData.ethnicity.charAt(0).toUpperCase() + characterData.ethnicity.slice(1)
    },
    {
      label: 'Age',
      value: characterData.age.toString(),
      image: <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex flex-col items-center justify-center">
        <span className="text-lg sm:text-2xl font-bold text-blue-800">{characterData.age}</span>
        <span className="text-[10px] sm:text-xs text-blue-600 font-medium">YEARS</span>
      </div>,
      displayValue: `${characterData.age} YEARS`
    },
    {
      label: 'Eyes Color',
      value: characterData.eyeColor,
      image: getEyeColorImage(characterData.eyeColor),
      displayValue: characterData.eyeColor.charAt(0).toUpperCase() + characterData.eyeColor.slice(1)
    },
    {
      label: 'Hair Style',
      value: characterData.hairStyle,
      image: getHairStyleImage(),
      displayValue: characterData.hairStyle.charAt(0).toUpperCase() + characterData.hairStyle.slice(1)
    },
    {
      label: 'Hair Color',
      value: characterData.hairColor,
      image: <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center">
        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black rounded-full"></div>
      </div>,
      displayValue: characterData.hairColor.charAt(0).toUpperCase() + characterData.hairColor.slice(1)
    },
    {
      label: 'Body Type',
      value: characterData.bodyType,
      image: getBodyTypeImage(),
      displayValue: characterData.bodyType.charAt(0).toUpperCase() + characterData.bodyType.slice(1)
    },
    {
      label: 'Personality',
      value: characterData.personality,
      image: getPersonalityIcon(),
      displayValue: characterData.personality.charAt(0).toUpperCase() + characterData.personality.slice(1)
    },
    {
      label: 'Relationship',
      value: characterData.relationship,
      image: getRelationshipIcon(),
      displayValue: characterData.relationship.charAt(0).toUpperCase() + characterData.relationship.slice(1).replace('_', ' ')
    },
    {
      label: 'Voice',
      value: characterData.voice,
      image: getVoiceIcon(),
      displayValue: characterData.voice.charAt(0).toUpperCase() + characterData.voice.slice(1)
    },
    {
      label: 'Occupation',
      value: characterData.occupation,
      image: <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
      </div>,
      displayValue: characterData.occupation.charAt(0).toUpperCase() + characterData.occupation.slice(1)
    },
    {
      label: 'Hobbies',
      value: characterData.hobbies.join(', '),
      image: <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-lg flex items-center justify-center">
        <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
      </div>,
      displayValue: characterData.hobbies.length > 0 ? characterData.hobbies.join(', ') : 'None selected'
    },
    {
      label: 'Clothing',
      value: characterData.clothing,
      image: <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg flex items-center justify-center">
        <Shirt className="w-6 h-6 sm:w-8 sm:h-8 text-orange-800" />
      </div>,
      displayValue: characterData.clothing.charAt(0).toUpperCase() + characterData.clothing.slice(1).replace('_', ' ')
    }
  ]

  return (
    <div className="flex flex-col items-center text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-12 text-center">
          Summary
        </h3>
        
        {/* First Row - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {summaryItems.slice(0, 5).map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{item.label}</span>
              <div className="bg-[#2a2d3a] rounded-xl p-2 sm:p-3 md:p-4 w-full flex flex-col items-center">
                <div className="mb-2 sm:mb-3">
                  {item.image}
                </div>
                <div className="text-white font-semibold text-center text-xs sm:text-sm">
                  {item.displayValue}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {summaryItems.slice(5, 10).map((item, index) => (
            <div key={index + 5} className="flex flex-col items-center">
              <span className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{item.label}</span>
              <div className="bg-[#2a2d3a] rounded-xl p-2 sm:p-3 md:p-4 w-full flex flex-col items-center">
                <div className="mb-2 sm:mb-3">
                  {item.image}
                </div>
                <div className="text-white font-semibold text-center text-xs sm:text-sm">
                  {item.displayValue}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third Row - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
          {summaryItems.slice(10, 13).map((item, index) => (
            <div key={index + 10} className="flex flex-col items-center">
              <span className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{item.label}</span>
              <div className="bg-[#2a2d3a] rounded-xl p-2 sm:p-3 md:p-4 w-full flex flex-col items-center">
                <div className="mb-2 sm:mb-3">
                  {item.image}
                </div>
                <div className="text-white font-semibold text-center text-xs sm:text-sm">
                  {item.displayValue}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          <button 
            onClick={onPrevious}
            className="sm:w-auto flex cursor-pointer items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-white rounded-xl border border-white/20 hover:border-gray-600 transition-all duration-300 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button 
            onClick={onComplete}
            className="w-full sm:w-auto relative flex cursor-pointer items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-medium"
          >
            <span className="text-[10px] sm:text-xs bg-pink-700 text-pink-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded absolute -top-2 -right-2">
              Free Trial
            </span>
            Bring my AI to life
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary
