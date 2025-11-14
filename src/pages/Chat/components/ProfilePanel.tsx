import { Phone, Sparkles, ChevronLeft, ChevronRight, User, Globe, Heart, Briefcase, Target, Star, Dumbbell } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BodyTypes } from '../../../config/api.config'
import { Ethnicities } from '../../../config/api.config'
import { Relationships } from '../../../config/api.config'
import { Occupations } from '../../../config/api.config'
import { Personnel } from '../../../config/api.config'

interface ProfilePanelProps {
  handleCall?: () => void
  activeChat: any
}

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

const ProfilePanel = ({ handleCall, activeChat }: ProfilePanelProps) => {
  const gender = activeChat.characters.attributes.gender;
  const male_images = [
    'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
    'https://cdn.candy.ai/330509-7525a5f1-0513-4179-9c19-b00259ec8868-webp90'
  ]

  const female_images = [
    'https://goodie-ai.vercel.app/images/girls/1/girl%20(12).png',
    'https://goodie-ai.vercel.app/images/girls/2/girl%20(12).png'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (gender === "girls" ? female_images : male_images).length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (gender === "girls" ? female_images : male_images).length) % (gender === "girls" ? female_images : male_images).length)
  }

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/generate')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
      {/* Character Profile */}
      <div className="flex-1">
        {/* Character Image Carousel */}
        <div className="relative group">
          <img
            src={(gender === "girls" ? female_images : male_images)[currentImageIndex]}
            alt="Charles Weston"
            className="w-full h-120 object-cover object-top"
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
            {(gender === "girls" ? female_images : male_images).map((_, index) => (
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
            <h2 className="text-white text-2xl font-bold mb-2">{activeChat.characters.name}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{activeChat.characters.introduction}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-3 gap-3">
            <button onClick={handleCall} className="w-full flex-1 bg-[#4fab52] text-white py-1.5 px-4 rounded-lg font-medium hover:bg-[#4fab52]/80 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>Call Me</span>
            </button>
            <button onClick={handleClick} className="w-full flex justify-center items-center p-1.5 rounded-[10px] border-2 border-[#f97187] text-[#f97187] cursor-pointer">
              <Sparkles className="w-4 h-4" />
              <span>Generate Image</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-3 p-4 border-t-2 border-gray-800">
          <h3 className="text-white font-semibold">About me:</h3>

          <div className="space-y-2.5 grid grid-cols-2 gap-3 lg:gap-6 pb-12 lg:pb-0 w-full overflow-hidden">
            <InfoItem icon={<User className="w-4 h-4" />} label="AGE" value={activeChat.characters.attributes.age} />
            <InfoItem icon={<Dumbbell className="w-4 h-4" />} label="BODY" value={BodyTypes[activeChat.characters.attributes.bodyType as keyof typeof BodyTypes] || activeChat.characters.attributes.bodyType} />
            <InfoItem icon={<Globe className="w-4 h-4" />} label="ETHNICITY" value={Ethnicities[activeChat.characters.attributes.ethnicity as keyof typeof Ethnicities] || activeChat.characters.attributes.ethnicity} />
            <InfoItem icon={<Globe className="w-4 h-4" />} label="LANGUAGE" value={"English"} />
            <InfoItem icon={<Heart className="w-4 h-4" />} label="RELATIONSHIP" value={Relationships[activeChat.characters.attributes.relationship as keyof typeof Relationships] || activeChat.characters.attributes.relationship} />
            <InfoItem icon={<Briefcase className="w-4 h-4" />} label="OCCUPATION" value={Occupations[activeChat.characters.attributes.occupation as keyof typeof Occupations] || activeChat.characters.attributes.occupation} />
            <InfoItem icon={<Target className="w-4 h-4" />} label="HOBBIES" value={activeChat.characters.attributes.hobbies} />
            <InfoItem icon={<Star className="w-4 h-4" />} label="PERSONALITY" value={Personnel[activeChat.characters.attributes.personality as keyof typeof Personnel] || activeChat.characters.attributes.personality} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
