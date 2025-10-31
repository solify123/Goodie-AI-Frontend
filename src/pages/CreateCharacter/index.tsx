import { useState } from 'react'
import Layout from '../../components/layout'
import { PencilRuler } from 'lucide-react'
import ProgressStepper from './components/ProgressStepper'
import StyleSelection from './components/StyleSelection'
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

const CreateCharacterPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [characterData, setCharacterData] = useState({
    style: '',
    ethnicity: '',
    age: 27,
    eyeColor: '',
    hairColor: '',
    hairStyle: '',
    bodyType: '',
    height: 180,
    skinTone: '',
    personality: '',
    voice: '',
    interests: [] as string[],
    occupation: '',
    hobbies: [] as string[],
    fashionStyle: '',
    relationship: '',
    clothing: ''
  })

  const totalSteps = 9

  const handleUpdateData = (key: string, value: any) => {
    setCharacterData(prev => ({ ...prev, [key]: value }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return characterData.style !== ''
      case 2:
        return characterData.ethnicity !== '' && characterData.eyeColor !== ''
      case 3:
        return characterData.hairStyle !== '' && characterData.hairColor !== ''
      case 4:
        return characterData.bodyType !== ''
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
      } else {
        // Save character
        console.log('Character data:', characterData)
      }
    }
  }

  const handleComplete = () => {
    // Save character and proceed to next page
    console.log('Character completed:', characterData)
    // Here you would typically navigate to the next page or show success message
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
                selected={characterData.style}
                onSelect={(value) => handleUpdateData('style', value)}
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
                selected={characterData.ethnicity}
                onSelect={(value: string) => handleUpdateData('ethnicity', value)}
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
                selected={characterData.eyeColor}
                onSelect={(value: string) => handleUpdateData('eyeColor', value)}
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
                selected={characterData.hairStyle}
                onSelect={(value: string) => handleUpdateData('hairStyle', value)}
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
                selected={characterData.bodyType}
                onSelect={(value) => handleUpdateData('bodyType', value)}
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
                selected={characterData.voice}
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
      <div className="flex flex-col items-center min-h-screen px-2 sm:px-4 md:p-6 w-full pb-24 md:pb-6">
        {/* Page Header - OUTSIDE the card */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 mx-auto mb-3 sm:mb-4 lg:mb-9 mt-2 sm:mt-5 md:mt-0">
        <PencilRuler className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          <div className="relative">
            <h1 className="text-center text-lg sm:text-xl md:text-[22px] text-white font-bold lg:text-[32px] lg:leading-[42px]">
              Create my AI
            </h1>
            <span className="create-elipse hidden lg:block"></span>
          </div>
        </div>

        {/* Progress Stepper - OUTSIDE the card */}
        <div className="mb-4 sm:mb-6 md:mb-12 w-full">
          <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Character Creation Form - INSIDE the card */}
        <div className="w-full max-w-[800px] bg-[#1a1a1a] rounded-xl sm:rounded-[1rem] border-1 border-[#282828] p-3 sm:p-6 lg:p-8">
          {renderStepContent()}

          {/* Navigation Buttons - Only show for steps 1-8 */}
          {currentStep !== 9 && (
            <div className="flex items-center justify-between pt-3 sm:pt-4 md:pt-6 border-t border-gray-800 gap-2 sm:gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base ${currentStep === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
              >
                <span>←</span>
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 whitespace-nowrap">
                Step {currentStep} of {totalSteps}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base ${!canProceed()
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700'
                  }`}
              >
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CreateCharacterPage
