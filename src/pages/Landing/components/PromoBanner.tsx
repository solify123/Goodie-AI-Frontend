import { Sparkles } from 'lucide-react'
import { useLandingTab } from '../../../contexts/LandingTabContext'

const PromoBanner = () => {
  const { activeTab } = useLandingTab()
  
  const getTitleText = () => {
    switch (activeTab) {
      case 'girls':
        return 'AI Girlfriend'
      case 'guys':
        return 'AI Boyfriend'
      case 'anime':
        return 'AI Anime Character'
      default:
        return 'AI Boyfriend'
    }
  }
  
  const getDescriptionText = () => {
    switch (activeTab) {
      case 'girls':
        return 'Your dream companion awaits! Create your AI Girlfriend, shape her look, personality, and bring her to life in one click. 100% powered by Artificial Intelligence.'
      case 'guys':
        return 'Your dream companion awaits! Create your AI Boyfriend, shape his look, personality, and bring him to life in one click. 100% powered by Artificial Intelligence.'
      case 'anime':
        return 'Your dream companion awaits! Create your AI Anime Character, shape their look, personality, and bring them to life in one click. 100% powered by Artificial Intelligence.'
      default:
        return 'Your dream companion awaits! Create your AI Boyfriend, shape his look, personality, and bring him to life in one click. 100% powered by Artificial Intelligence.'
    }
  }
  
  return (
    <div className="relative w-full py-6 lg:py-12 lg:h-80 rounded-3xl overflow-hidden border border-[#009688]/20 mb-12 bg-[#1a1a1a]">
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0 px-8 lg:px-12">
        {/* Left Side - Text Content */}
        <div className="flex-1 lg:max-w-2xl md:max-w-none">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 w-full">
            <span className="text-white">create your own </span>
            <span className="text-[#009688]">{getTitleText()}</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-300 leading-relaxed w-full">
            {getDescriptionText()}
          </p>
        </div>

        {/* Right Side - CTA Button */}
        <div className="hidden lg:block">
          <button className="cursor-pointer flex items-center space-x-2 bg-[#00897b] text-white px-6 py-3 rounded-lg font-medium hover:from-[#00897b] hover:to-[#00796b] transition-all duration-200 shadow-lg shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] whitespace-nowrap">
            <Sparkles className="w-5 h-5" />
            <span>Create your AI</span>
          </button>
        </div>
        {/* Right Side - CTA Button */}
        <div className="lg:hidden">
          <button className="cursor-pointer flex items-center space-x-2 bg-[#00897b] text-white px-6 py-3 rounded-lg font-medium hover:from-[#00897b] hover:to-[#00796b] transition-all duration-200 shadow-lg shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] whitespace-nowrap">
            <Sparkles className="w-5 h-5" />
            <span>Create your AI</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default PromoBanner

