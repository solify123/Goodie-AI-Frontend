import { Phone, Sparkles, ChevronLeft, ChevronRight, User, Globe, Heart, Briefcase, Target, Star, Dumbbell } from 'lucide-react'
import { useState } from 'react'

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-sm font-medium truncate">{value}</p>
    </div>
  </div>
)

const ProfilePanel = () => {
  const images = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=400&fit=crop&crop=face'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
      {/* Character Profile */}
      <div className="flex-1">
        {/* Character Image Carousel */}
        <div className="relative group">
          <img
            src={images[currentImageIndex]}
            alt="Charles Weston"
            className="w-full h-120 object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Character Info */}
        <div className="space-y-4 p-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Charles Weston</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Distinguished and affluent businessman with a passion for luxury and excellence.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-3 gap-3">
            <button className="w-full flex-1 bg-[#4fab52] text-white py-1.5 px-4 rounded-lg font-medium hover:bg-[#4fab52]/80 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>Call Me</span>
            </button>
            <button className="w-full flex justify-center items-center p-1.5 rounded-[10px] border-2 border-[#f97187] text-[#f97187] cursor-pointer">
              <Sparkles className="w-4 h-4" />
              <span>Generate Image</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-3 p-4 border-t-2 border-gray-800">
          <h3 className="text-white font-semibold">About me:</h3>

          <div className="space-y-2.5 grid grid-cols-2 gap-3 lg:gap-6 pb-12 lg:pb-0 w-full overflow-hidden">
            <InfoItem icon={<User className="w-4 h-4" />} label="AGE" value="49" />
            <InfoItem icon={<Dumbbell className="w-4 h-4" />} label="BODY" value="Fit" />
            <InfoItem icon={<Globe className="w-4 h-4" />} label="ETHNICITY" value="Caucasian" />
            <InfoItem icon={<Globe className="w-4 h-4" />} label="LANGUAGE" value="English" />
            <InfoItem icon={<Heart className="w-4 h-4" />} label="RELATIONSHIP" value="None" />
            <InfoItem icon={<Briefcase className="w-4 h-4" />} label="OCCUPATION" value="Successful Entrepreneur" />
            <InfoItem icon={<Target className="w-4 h-4" />} label="HOBBIES" value="Luxury Travel, Vintage Car Collection" />
            <InfoItem icon={<Star className="w-4 h-4" />} label="PERSONALITY" value="Charismatic and Confident" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
