import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'
import { ChevronLeft, ChevronRight, Mars, Venus } from 'lucide-react'
import ProgressStepper from './components/ProgressStepper'
import StyleSelection from './components/StyleSelection'
import createCharacterBanner1 from '../../assets/images/create-character-banner1.png'
import createCharacterBanner2 from '../../assets/images/create-character-banner2.png'
import createCharacterBanner3 from '../../assets/images/create-character-banner3.png'
import EthnicitySelection from './components/EthnicitySelection'
import AgeSlider from './components/AgeSlider'
import EyeColorSelection from './components/EyeColorSelection'
import HairStyleSelection from './components/HairStyleSelection'
import HairColorSelection from './components/HairColorSelection'
import BodyTypeSelection from './components/BodyTypeSelection'
import PersonalitySelection from './components/PersonalitySelection'
import VoiceSelection from './components/VoiceSelection'
import OccupationSelection from './components/OccupationSelection'
import HobbiesSelection from './components/HobbiesSelection'
import RelationshipSelection from './components/RelationshipSelection'
import ClothingSelection from './components/ClothingSelection'
import Summary from './components/Summary'
import { toast } from 'sonner'
import { useCreateCharacterGender } from '../../contexts/GlobalContext'
import { useCharacter } from '../../hooks/useCharacter'
import { useNavigate } from 'react-router-dom'

const CreateCharacterPage = () => {
  const { createCharacter } = useCharacter()
  const navigate = useNavigate()
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false)
  const [characterResult, setCharacterResult] = useState<{ name: string; image: string, chatProfile: string, introduction: string, id: string } | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState<'girls' | 'guys'>('girls')
  const { setGender, gender } = useCreateCharacterGender()
  const [timeLeft, setTimeLeft] = useState({
    hours: 20,
    minutes: 22,
    seconds: 30
  })
  const [characterData, setCharacterData] = useState({
    style: {
      value: '',
      image: ''
    },
    ethnicity: {
      value: '',
      image: ''
    },
    age: 27,
    eyeColor: {
      value: '',
      image: ''
    },
    hairColor: '',
    hairStyle: {
      value: '',
      image: ''
    },
    bodyType: {
      value: '',
      image: ''
    },
    gender: '',
    personality: '',
    voice: '',
    occupation: '',
    hobbies: [],
    relationship: '',
    clothing: ''
  })

  const tabs = [
    { key: 'girls', label: 'Girls', Icon: Venus },
    { key: 'guys', label: 'Guys', Icon: Mars },
  ] as const
  const totalSteps = 9

  useEffect(() => {
    setCharacterData(prev => ({ ...prev, gender: gender }))
  }, [gender])

  useEffect(() => {
    if (activeTab === 'girls') {
      setGender('girls')
    } else if (activeTab === 'guys') {
      setGender('guys')
    }
  }, [activeTab])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Timer ended
          return { hours: 0, minutes: 0, seconds: 0 }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep')
    if (currentStep) {
      setCurrentStep(Number(currentStep))
    }
  }, [currentStep])

  useEffect(() => {
    localStorage.setItem('characterData', JSON.stringify(characterData))
  }, [characterData])

  useEffect(() => {
    const characterData = localStorage.getItem('characterData')
    if (characterData) {
      setCharacterData(JSON.parse(characterData))
    }
  }, [])


  const handleUpdateData = (key: string, value: any) => {
    setCharacterData(prev => ({ ...prev, [key]: value }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return characterData.style.value !== ''
      case 2:
        return characterData.ethnicity.value !== '' && characterData.eyeColor.value !== ''
      case 3:
        return characterData.hairStyle.value !== '' && characterData.hairColor !== ''
      case 4:
        return characterData.bodyType.value !== ''
      case 5:
        return characterData.personality !== '' && characterData.voice !== ''
      case 6:
        return characterData.occupation !== '' && characterData.hobbies.length > 0
      case 7:
        return characterData.relationship !== ''
      case 8:
        return characterData.clothing !== ''
      case 9:
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
        localStorage.setItem('currentStep', (currentStep + 1).toString())
      } else {
        // Save character
        console.log('Character data:', characterData)
      }
    }
  }

  const handleComplete = async () => {
    const attributes = {
      style: characterData.style.value,
      ethnicity: characterData.ethnicity.value,
      age: characterData.age,
      eyeColor: characterData.eyeColor.value,
      hairColor: characterData.hairColor,
      hairStyle: characterData.hairStyle.value,
      bodyType: characterData.bodyType.value,
      gender: characterData.gender,
      personality: characterData.personality,
      voice: characterData.voice,
      occupation: characterData.occupation,
      hobbies: characterData.hobbies.join(','),
      relationship: characterData.relationship,
      clothing: characterData.clothing,
    }
    localStorage.removeItem("currentStep")
    localStorage.removeItem("characterData")
    setIsCreatingCharacter(true)
    setCharacterResult(null)
    
    try {
      const response = await createCharacter(attributes)
      if (response.success && response.data) {
        setCharacterResult({
          name: response.data.name || 'Character',
          image: response.data.image || '',
          chatProfile: response.data.chatProfile || '',
          introduction: response.data.introduction || '',
          id: response.data.id || ''
        })
        toast.success('Character created successfully!')
      } else {
        throw new Error(response.error || 'Failed to create character')
      }
    } catch (error: any) {
      console.error('Error creating character:', error)
      toast.error(error.message || 'Failed to create character. Please try again.')
    } finally {
      setIsCreatingCharacter(false)
    }
  }

  const handleCloseModal = () => {
    localStorage.clear()
    navigate('/')
    setCharacterResult(null)
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      localStorage.setItem('currentStep', (currentStep - 1).toString())
    } else {
      // Navigate back or close
      window.history.back()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/* Choose Style Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <StyleSelection
                selected={characterData.style.value}
                onSelect={(value) => handleUpdateData('style', { value: value.value, image: value.image })}
              />
            </div>
          </>
        )
      case 2:
        return (
          <>
            {/* Choose Ethnicity Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <EthnicitySelection
                selected={characterData.ethnicity.value}
                onSelect={(value) => handleUpdateData('ethnicity', { value: value.value, image: value.image })}
              />
            </div>

            {/* Choose Age Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <AgeSlider
                value={characterData.age}
                onChange={(value: number) => handleUpdateData('age', value)}
              />
            </div>

            {/* Choose Eye Color Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <EyeColorSelection
                selected={characterData.eyeColor.value}
                onSelect={(value) => handleUpdateData('eyeColor', { value: value.value, image: value.image })}
              />
            </div>
          </>
        )
      case 3:
        return (
          <>
            {/* Choose Hair Style Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <HairStyleSelection
                selected={characterData.hairStyle.value}
                onSelect={(value) => handleUpdateData('hairStyle', { value: value.value, image: value.image })}
              />
            </div>

            {/* Choose Hair Color Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <HairColorSelection
                selected={characterData.hairColor}
                onSelect={(value: string) => handleUpdateData('hairColor', value)}
              />
            </div>
          </>
        )
      case 4:
        return (
          <>
            {/* Choose Body Type Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <BodyTypeSelection
                selected={characterData.bodyType.value}
                onSelect={(value) => handleUpdateData('bodyType', { value: value.value, image: value.image })}
              />
            </div>
          </>
        )
      case 5:
        return (
          <>
            {/* Choose Personality Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <PersonalitySelection
                selected={characterData.personality}
                onSelect={(value: string) => handleUpdateData('personality', value)}
              />
            </div>

            {/* Choose Voice Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <VoiceSelection
                selected={characterData.voice.toString()}
                onSelect={(value: string) => handleUpdateData('voice', value)}
              />
            </div>
          </>
        )
      case 6:
        return (
          <>
            {/* Choose Occupation Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <OccupationSelection
                selected={characterData.occupation}
                onSelect={(value: string) => handleUpdateData('occupation', value)}
              />
            </div>

            {/* Choose Hobbies Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <HobbiesSelection
                selected={characterData.hobbies}
                onSelect={(values: string[]) => handleUpdateData('hobbies', values)}
              />
            </div>
          </>
        )
      case 7:
        return (
          <>
            {/* Choose Relationship Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <RelationshipSelection
                selected={characterData.relationship}
                onSelect={(value: string) => handleUpdateData('relationship', value)}
              />
            </div>
          </>
        )
      case 8:
        return (
          <>
            {/* Choose Clothing Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <ClothingSelection
                selected={characterData.clothing}
                onSelect={(value: string) => handleUpdateData('clothing', value)}
              />
            </div>
          </>
        )
      case 9:
        return (
          <>
            {/* Summary Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <Summary
                characterData={characterData}
                onPrevious={handlePrevious}
                onComplete={handleComplete}
                isLoading={isCreatingCharacter}
                characterResult={characterResult}
                onCloseModal={handleCloseModal}
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full">
        {/* Mobile Navigation */}
        <nav className="hidden min-[320px]:flex md:hidden">
          <ul className="flex w-full items-center gap-2 bg-[#1A1A24] p-2">
            {tabs.map(({ key, label, Icon }) => {
              const isActive = activeTab === key
              return (
                <li key={key} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all ${isActive
                      ? 'outline-2 outline-[#009688]'
                      : 'text-gray-300 hover:bg-white/5'
                      }`}
                    aria-pressed={isActive}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
        {/* Halloween Sale Banner - 4 Divs Structure */}
        <div className="w-full mb-4 sm:mb-6 relative overflow-hidden" style={{ height: '56px', backgroundColor: '#1A0F33' }}>
          {/* Red line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 z-10"></div>

          {/* Div 1: Left - banner1 - 30% */}
          <div className="absolute left-0 top-0 bottom-0 w-[180px] overflow-hidden z-0">
            <img
              src={createCharacterBanner1}
              alt="Left Character"
              className="w-full h-full"
            />
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-full z-10 h-full flex justify-center items-center gap-3">
            {/* Div 2: banner2 - 30% */}
            <div className="py-2 h-full">
              <img
                src={createCharacterBanner2}
                alt="Center Character"
                className="w-full h-full aspect-12/1 hidden lg:block"
              />
              <img
                src="https://candy.ai/assets/promotions/halloween/banner/free/en/mobile-central-8f4f50b434877c24895e7345f23100c60c06b3c7dd5605419a6f5d2926a59987.webp"
                alt="Center Character"
                className="w-full h-full block lg:hidden"
              />
            </div>

            {/* Div 3: Timer - 10% */}
            <div className="w-auto flex items-center justify-center max-w-[180px] gap-1 z-20">
              {/* Countdown Timer Section */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Hours */}
                <div className="flex flex-col items-center border-r border-white/20 pr-1 sm:pr-2">
                  <span className="text-white font-bold text-[15px] leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Hrs</span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center border-r border-white/20 pr-1 sm:pr-2">
                  <span className="text-white font-bold text-[15px] leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Min</span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-[15px] leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Div 4: Right - banner4 - 30% */}
          <div className="absolute hidden 2xl:block left-[85%] top-0 bottom-0 w-[15%] overflow-hidden z-0">
            <img
              src={createCharacterBanner3}
              alt="Right Character"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center px-2 sm:px-4 md:p-6 w-full pb-24 md:pb-6 gap-8" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>
          {/* Page Header - OUTSIDE the card */}
          <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 mx-auto sm:mb-4 mt-2 sm:mt-5 md:mt-0">
            <img
              src="https://candy.ai/assets/sidebar-icons/edit-tools-bbf2bf2c112195dace08ca66624f3aaee6cdce6fb94e6712f6ec1ecf3e1576e0.svg"
              alt="Edit Tools"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            />
            <div className="relative">
              <h1 className="text-center text-lg sm:text-xl md:text-[22px] text-white font-bold lg:text-[32px] lg:leading-[42px]">
                Create my AI
              </h1>
            </div>
          </div>

          {/* Progress Stepper - OUTSIDE the card */}
          <div className="mb-4 sm:mb-6 md:mb-8 w-full">
            <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          {/* Character Creation Form - INSIDE the card */}
          <div className="w-full max-w-[800px] bg-[#1a1a1a] rounded-xl sm:rounded-[1rem] border border-[#282828] p-3 sm:p-6 lg:p-8">
            {renderStepContent()}

            {/* Navigation Buttons - Only show for steps 1-8 */}
            {currentStep !== 9 && (
              <div className={`flex items-center justify-between pt-3 sm:pt-4 md:pt-6 gap-2 sm:gap-4 ${currentStep === 1 ? 'justify-end' : 'justify-between'}`}>
                {
                  currentStep !== 1 && (
                    <button
                      onClick={handlePrevious}
                      className={`flex cursor-pointer items-center px-5 py-3 rounded-lg gap-4 font-medium transition-all text-sm sm:text-base ${currentStep === 1
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-white border-2 border-white/20 hover:border-gray-600'
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  )
                }

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex cursor-pointer items-center ${currentStep === 1 ? 'w-[300px] md:w-auto mx-auto' : 'w-auto'} justify-center sm:mx-0 space-x-2 px-9 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${!canProceed()
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r to-[#00bfa5] to-[#00897b] text-white hover:from-[#00897b] hover:to-[#00796b] shadow-lg shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)]'
                    }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <BottomNavigation />
      </div>
    </Layout>
  )
}

export default CreateCharacterPage
