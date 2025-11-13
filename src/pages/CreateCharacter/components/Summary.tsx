import {
  Briefcase,
  Gamepad2,
  Shirt,
  Loader2,
  X
} from 'lucide-react'
import { personalities } from './PersonalitySelection'
import { relationships } from './RelationshipSelection'

interface SummaryProps {
  characterData: {
    style: {
      value: string
      image: string
    }
    ethnicity: {
      value: string
      image: string
    }
    age: number
    eyeColor: {
      value: string
      image: string
    }
    hairColor: string
    hairStyle: {
      value: string
      image: string
    }
    bodyType: {
      value: string
      image: string
    }
    personality: string
    voice: string
    occupation: string
    hobbies: string[]
    relationship: string
    clothing: string
  }
  onPrevious: () => void
  onComplete: () => void
  isLoading?: boolean
  characterResult?: {
    name: string
    image: string
  } | null
  onCloseModal?: () => void
}

const Summary = ({ characterData, onPrevious, onComplete, isLoading = false, characterResult = null, onCloseModal }: SummaryProps) => {
  const getStyleImage = (style: { value: string, image: string }) => {
    return <img src={style.image} alt="Style" className="object-cover object-top rounded-xl lg:w-[120px] lg:h-[120px] w-[88px] h-[88px]" />
  }

  const getEthnicityImage = (ethnicity: { value: string, image: string }) => {
    return <img src={ethnicity.image} alt="Ethnicity" className="object-cover object-top rounded-xl lg:w-[120px] lg:h-[120px] w-[88px] h-[88px]" />
  }

  const getEyeColorImage = (eyeColor: { value: string, image: string }) => {
    return <img src={eyeColor.image} alt="Eye Color" className="object-cover object-top rounded-xl lg:w-[120px] lg:h-[120px] w-[88px] h-[88px]" />
  }

  const getHairStyleImage = (hairStyle: { value: string, image: string }) => {
    return <img src={hairStyle.image} alt="Hair Style" className="object-cover object-top rounded-xl lg:w-[120px] lg:h-[120px] w-[88px] h-[88px]" />
  }

  const getBodyTypeImage = (bodyType: { value: string, image: string }) => {
    return <img src={bodyType.image} alt="Body Type" className="object-cover object-top rounded-xl lg:w-[120px] lg:h-[120px] w-[88px] h-[88px]" />
  }

  const getPersonalityIcon = (personality: string) => {
    const personalityData = personalities.find(p => p.value === personality)
    return <div className="lg:w-[120px] lg:h-[120px] w-[88px] h-[88px] relative pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center bg-stone-900 rounded-[10px] border border-zinc-800">
      <div className="m-auto text-white flex flex-col items-center">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">{personalityData?.icon}</div>
        <div className="text-xs font-medium text-[#E1E1E1]">{personalityData?.label}</div>
      </div>
    </div>
  }

  const getRelationshipIcon = (relationship: string) => {
    const relationshipData = relationships.find(r => r.value === relationship)
    return <div className="lg:w-[120px] lg:h-[120px] w-[88px] h-[88px] relative pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center bg-stone-900 rounded-[10px] border border-zinc-800">
      <div className="m-auto text-white flex flex-col items-center">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">{relationshipData?.icon}</div>
        <div className="text-xs font-medium text-[#E1E1E1]">{relationshipData?.label}</div>
      </div>
    </div>
  }

  const getVoiceIcon = (voice: string) => {
    return <div className="lg:w-[120px] lg:h-[120px] w-[88px] h-[88px] relative pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center bg-stone-900 rounded-[10px] border border-zinc-800">
      <div className="m-auto text-white flex flex-col items-center gap-y-4">
        <div data-audio-target="wrapper" className="toggle-play-button button-transform cursor-pointer w-8 md:w-12 w-8 md:h-12 p-1 justify-center items-center inline-flex rounded-full bg-white" data-controller="audio" data-action="click-&gt;audio#togglePlay">
          <div className="relative">
            <div className="flex items-center justify-center w-6 h-6 md:w-9 md:h-9 text-black">
              <svg id="play-icon" className="text-black w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path>
              </svg>
            </div>
            <div className="hidden w-6 h-6 md:w-9 md:h-9 text-black">
              <svg id="pause-icon" className="text-black" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="text-xs font-medium text-[#E1E1E1]">{voice}</div>
      </div>
    </div>
  }

  const summaryItems = [
    {
      label: 'Style',
      value: characterData.style.value,
      image: getStyleImage(characterData.style),
      displayValue: characterData.style.value
    },
    {
      label: 'Ethnicity',
      value: characterData.ethnicity.value,
      image: getEthnicityImage(characterData.ethnicity),
      displayValue: characterData.ethnicity.value.charAt(0).toUpperCase() + characterData.ethnicity.value.slice(1)
    },
    {
      label: 'Age',
      value: characterData.age.toString(),
      image: <div className="lg:w-[120px] lg:h-[120px] w-[88px] h-[88px] relative pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center bg-stone-900 rounded-[10px] border border-zinc-800">
        <div className="m-auto text-white break-all whitespace-normal">
          <div className="text-sm lg:text-3xl lg:de:text-[20px] font-medium">{characterData.age}</div>
          <div className="text-sm text-[#E1E1E1]">YEARS</div>
        </div>
      </div>,
      displayValue: `${characterData.age} YEARS`
    },
    {
      label: 'Eyes Color',
      value: characterData.eyeColor.value,
      image: getEyeColorImage(characterData.eyeColor),
      displayValue: characterData.eyeColor.value.charAt(0).toUpperCase() + characterData.eyeColor.value.slice(1)
    },
    {
      label: 'Hair Style',
      value: characterData.hairStyle.value,
      image: getHairStyleImage(characterData.hairStyle),
      displayValue: characterData.hairStyle.value.charAt(0).toUpperCase() + characterData.hairStyle.value.slice(1)
    },
    {
      label: 'Hair Color',
      value: characterData.hairColor,
      image: <div style={{ background: characterData.hairColor, color: 'white' }} className="lg:w-[120px] lg:h-[120px] w-[88px] h-[88px] relative pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center rounded-[10px] border border-zinc-800">
        <div className="text-xs font-medium leading-[30px]">{characterData.hairColor.charAt(0).toUpperCase() + characterData.hairColor.slice(1)}</div>
      </div>,
      displayValue: characterData.hairColor
    },
    {
      label: 'Body Type',
      value: characterData.bodyType.value,
      image: getBodyTypeImage(characterData.bodyType),
      displayValue: characterData.bodyType.value.charAt(0).toUpperCase() + characterData.bodyType.value.slice(1)
    },
    {
      label: 'Personality',
      value: characterData.personality,
      image: getPersonalityIcon(characterData.personality),
      displayValue: personalities.find(p => p.value === characterData.personality)?.label
    },
    {
      label: 'Relationship',
      value: characterData.relationship,
      image: getRelationshipIcon(characterData.relationship),
      displayValue: relationships.find(r => r.value === characterData.relationship)?.label
    },
    {
      label: 'Voice',
      value: characterData.voice,
      image: getVoiceIcon(characterData.voice.toString()),
      displayValue: characterData.voice
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
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {summaryItems.slice(0, 10).map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-sm text-[#E1E1E1] flex grow justify-center items-center mb-3 font-medium">{item.label}</div>

              <div className="text-[13px] relative rounded-xl">
                {item.image}
                {
                  item.label != 'Age' && item.label != 'Hair Color' && item.label != 'Personality' && item.label != 'Relationship' && item.label != 'Voice' && (
                    <div className="text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill pill-inactive">
                      {item.displayValue}
                    </div>
                  )
                }
              </div>

            </div>
          ))}
        </div>

        {/* Third Row - Responsive columns */}
        <div className="flex flex-col mb-10">
          <div className="justify-center  grid grid-cols-1 lg:grid-cols-3 gap-[15px] lg:gap-7">
            {summaryItems.slice(10, 13).map((item, index) => (
              <div key={index}>
                <div className="text-[14px] rounded-xl text-white mb-2">{item.label}</div>
                <div className="text-[14px] rounded-xl text-white w-fit px-3 py-2 leading-[14px] select-none pill-option-inactive border border-white/20">{item.displayValue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse justify-between items-center gap-4 w-full">
          <button
            onClick={onComplete}
            disabled={isLoading}
            className="w-full sm:w-auto relative flex cursor-pointer items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-2.5 bg-[#009688] text-white rounded-xl hover:bg-[#00897b] transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-[10px] sm:text-xs bg-[blueviolet] text-[#b2dfdb] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded absolute -top-2 -right-2">
              Free Trial
            </span>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Bring my AI to life
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
          <button
            onClick={onPrevious}
            disabled={isLoading}
            className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-white rounded-xl border border-white/20 hover:border-gray-600 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        </div>
      </div>

      {/* Character Result Modal */}
      {characterResult && onCloseModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
          onClick={onCloseModal}
        >
          <div
            className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl w-full max-w-md mx-4 relative overflow-hidden"
            style={{ animation: 'fadeInScale 0.2s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Character Image */}
            <div className="w-full aspect-square relative">
              {characterResult.image ? (
                <img
                  src={characterResult.image}
                  alt={characterResult.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#009688]" />
                    <p className="text-sm text-gray-400">Generating image...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Character Name and Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                {characterResult.name}
              </h2>
              <p className="text-gray-300 text-sm text-center mb-6">
                Your AI character has been created successfully!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={onCloseModal}
                  className="w-full px-4 py-3 bg-[#009688] text-white rounded-lg hover:bg-[#00897b] transition-colors cursor-pointer font-medium"
                >
                  Start Chatting
                </button>
                <button
                  onClick={onCloseModal}
                  className="w-full px-4 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary
