const HeroBanner = () => {
  return (
    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden mb-6 lg:mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 opacity-80"></div>
      
      {/* Blurred Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-600/30 backdrop-blur-sm"></div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  )
}

export default HeroBanner
