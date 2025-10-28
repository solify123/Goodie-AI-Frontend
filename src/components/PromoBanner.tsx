import { Sparkles } from 'lucide-react'

const PromoBanner = () => {
  return (
    <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-pink-500/20 mb-12">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/50 to-purple-800/60">
        {/* Simulated image background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-800/70 to-purple-900/80"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-between px-8 lg:px-12">
        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-white">create your own </span>
            <span className="text-pink-500">AI Boyfriend</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-xl">
            Your dream companion awaits! Create your AI Boyfriend, shape his look, personality, and bring him to life in one click. 100% powered by Artificial Intelligence.
          </p>
        </div>

        {/* Right Side - CTA Button */}
        <div className="hidden lg:block">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-pink-500/30 whitespace-nowrap">
            <Sparkles className="w-5 h-5" />
            <span>Create your AI</span>
          </button>
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-pink-500/30">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Create your AI</span>
        </button>
      </div>
    </div>
  )
}

export default PromoBanner

