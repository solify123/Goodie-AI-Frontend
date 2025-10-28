const HeroBanner = () => {
  return (
    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden mb-6 lg:mb-8">
      {/* Background Image with Character */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600">
        {/* Character Image Placeholder - In a real app, this would be an actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300/80 to-yellow-400/60"></div>
      </div>
      
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white text-center drop-shadow-lg">
          AI Boyfriend Characters
        </h1>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  )
}

export default HeroBanner
