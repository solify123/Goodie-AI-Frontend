import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: 'Create Your Perfect AI Companion',
      subtitle: 'Chat, generate images, and build deep connections',
      gradient: 'from-purple-600/40 via-pink-600/40 to-blue-600/40'
    },
    {
      title: 'Unlimited Conversations',
      subtitle: 'Experience meaningful interactions powered by AI',
      gradient: 'from-pink-600/40 via-rose-600/40 to-orange-600/40'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden group">
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-700`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 transition-all duration-500">
          {slides[currentSlide].title}
        </h2>
        <p className="text-lg lg:text-xl text-gray-200 max-w-2xl transition-all duration-500">
          {slides[currentSlide].subtitle}
        </p>
        <button className="cursor-pointer mt-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-pink-500/30">
          Get Started
        </button>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-pink-500 w-8' : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner
