
interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
}

const ProgressStepper = ({ currentStep, totalSteps }: ProgressStepperProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-4xl overflow-x-auto px-2 sm:px-4 mx-auto">
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
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-pink-500'
                      : isCurrent
                      ? 'bg-pink-500'
                      : 'bg-gray-700 border-2 border-gray-600'
                  }`}
                >
                  {isCompleted || isCurrent ? (
                    <span className="text-[10px] sm:text-xs font-semibold text-white">
                      {step}
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400">
                      {step}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connecting Line */}
              {step < totalSteps && (
                <div
                  className={`h-[2px] w-6 sm:w-8 md:w-12 transition-colors duration-300 ${
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
