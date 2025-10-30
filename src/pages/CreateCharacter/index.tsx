import { useState } from 'react'
import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { useSidebar } from '../../contexts/SidebarContext'
import { Edit } from 'lucide-react'
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
  const { isCollapsed } = useSidebar()
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
            <div className="mb-12">
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
            <div className="mb-12">
              <EthnicitySelection
                selected={characterData.ethnicity}
                onSelect={(value: string) => handleUpdateData('ethnicity', value)}
              />
            </div>

            {/* Choose Age Section */}
            <div className="mb-12">
              <AgeSlider
                value={characterData.age}
                onChange={(value: number) => handleUpdateData('age', value)}
              />
            </div>

            {/* Choose Eye Color Section */}
            <div className="mb-12">
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
            <div className="mb-12">
              <HairStyleSelection
                selected={characterData.hairStyle}
                onSelect={(value: string) => handleUpdateData('hairStyle', value)}
              />
            </div>

            {/* Choose Hair Color Section */}
            <div className="mb-12">
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
            <div className="mb-12">
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
            <div className="mb-12">
              <PersonalitySelection
                selected={characterData.personality}
                onSelect={(value: string) => handleUpdateData('personality', value)}
              />
            </div>

            {/* Choose Voice Section */}
            <div className="mb-12">
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
            <div className="mb-12">
              <OccupationSelection
                selected={characterData.occupation}
                onSelect={(value: string) => handleUpdateData('occupation', value)}
              />
            </div>

            {/* Choose Hobbies Section */}
            <div className="mb-12">
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
            <div className="mb-12">
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
            <div className="mb-12">
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
            <div className="mb-12">
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
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`} style={{ paddingTop: '60px' }}>
        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center min-h-screen p-6">
            {/* Page Header - OUTSIDE the card */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Edit className="w-4 h-4 text-pink-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Create my AI</h1>
            </div>

            {/* Progress Stepper - OUTSIDE the card */}
            <div className="mb-12">
              <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Character Creation Form - INSIDE the card */}
            <div className="w-[800px] bg-[#1a1a1a] rounded-[1rem] p-8">
              {renderStepContent()}

              {/* Navigation Buttons - Only show for steps 1-8 */}
              {currentStep !== 9 && (
                <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>

                  <div className="text-sm text-gray-400">
                    Step {currentStep} of {totalSteps}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${!canProceed()
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
        </main>
      </div>
    </div>
  )
}

export default CreateCharacterPage
