import { Check } from 'lucide-react'

interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
}

const ProgressStepper = ({ currentStep, totalSteps }: ProgressStepperProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-4xl overflow-x-auto px-4">
      {/* Progress Line with Steps */}
      <div className="flex items-center min-w-max">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep
          
          return (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-pink-500'
                      : isCurrent
                      ? 'bg-transparent border-2 border-pink-500'
                      : 'bg-transparent border-2 border-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <span
                      className={`text-xs font-semibold ${
                        isCurrent ? 'text-pink-500' : 'text-gray-600'
                      }`}
                    >
                      {step}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connecting Line */}
              {step < totalSteps && (
                <div
                  className={`h-[2px] w-8 transition-colors duration-300 ${
                    step < currentStep ? 'bg-pink-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressStepper
