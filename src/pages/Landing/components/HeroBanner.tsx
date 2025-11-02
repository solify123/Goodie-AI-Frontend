import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLandingTab } from '../../../contexts/LandingTabContext'
import heroMen1 from '../../../assets/images/slider/men/1.jpg'
import heroMen2 from '../../../assets/images/slider/men/2.jpg'
import heroMen3 from '../../../assets/images/slider/men/3.jpg'
// import heroGirls1 from '../../../assets/images/slider/girls/1.png'
// import heroGirls2 from '../../../assets/images/slider/girls/2.png'
// import heroGirls3 from '../../../assets/images/slider/girls/3.png'
// import heroAnime1 from '../../../assets/images/slider/anime/1.png'
// import heroAnime2 from '../../../assets/images/slider/anime/2.png'
// import heroAnime3 from '../../../assets/images/slider/anime/3.png'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { activeTab } = useLandingTab()
  const autoSlideInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  
  // Get title based on active tab
  const getTitleByTab = (slideIndex: number) => {
    if (slideIndex === 0) {
      switch (activeTab) {
        case 'girls':
          return 'Create Your Perfect AI Girlfriend'
        case 'guys':
          return 'Create Your Perfect AI Boyfriend'
        case 'anime':
          return 'Create Your Perfect AI Anime Companion'
        default:
          return 'Create Your Perfect AI Companion'
      }
    } else {
      switch (activeTab) {
        case 'girls':
          return 'Unlimited AI Girlfriend Chats'
        case 'guys':
          return 'Unlimited AI Boyfriend Chats'
        case 'anime':
          return 'Unlimited Anime Character Chats'
        default:
          return 'Unlimited Conversations'
      }
    }
  }
  
  // Get images based on active tab
  const getImagesByTab = () => {
    switch (activeTab) {
      case 'guys':
        return [heroMen1, heroMen2, heroMen3]
      case 'girls':
        return [heroMen1, heroMen2, heroMen3] // Placeholder until girls images are added
      case 'anime':
        return [heroMen1, heroMen2, heroMen3] // Placeholder until anime images are added
      default:
        return [heroMen1, heroMen2, heroMen3]
    }
  }
  
  const images = getImagesByTab()
  
  const slides = useMemo(() => [
    {
      title: getTitleByTab(0),
      subtitle: 'Chat, generate images, and build deep connections',
      gradient: 'from-purple-600/40 via-pink-600/40 to-blue-600/40',
      image: images[0]
    },
    {
      title: getTitleByTab(1),
      subtitle: 'Experience meaningful interactions powered by AI',
      gradient: 'from-pink-600/40 via-rose-600/40 to-orange-600/40',
      image: images[1]
    },
    {
      title: getTitleByTab(0),
      subtitle: 'Connect with your perfect AI companion',
      gradient: 'from-blue-600/40 via-purple-600/40 to-pink-600/40',
      image: images[2]
    }
  ], [activeTab])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Reset slide to 0 when tab changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeTab])

  // Auto-slide every 3 seconds
  useEffect(() => {
    autoSlideInterval.current = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current)
      }
    }
  }, [nextSlide, activeTab])

  return (
    <div className="relative w-full h-56 sm:h-64 lg:h-80 rounded-xl overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
      </div>
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
