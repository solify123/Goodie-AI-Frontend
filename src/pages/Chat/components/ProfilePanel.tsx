import { Phone, Sparkles } from 'lucide-react'

const InfoItem = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-sm">{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-sm font-medium truncate">{value}</p>
    </div>
  </div>
)

const ProfilePanel = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
      {/* Character Profile */}
      <div className="flex-1">
        {/* Character Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
            alt="Arthur Murphy"
            className="w-full h-104 object-cover"
          />
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
            <button className="w-full flex-1 bg-[#4fab52] text-white py-1 px-4 rounded-lg font-medium hover:bg-[#4fab52]/80 transition-colors flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Me</span>
            </button>
            <button className="w-full flex justify-center items-center p-1 rounded-[10px] border-2 border-[#f97187] text-[#f97187]">
              <Sparkles className="w-4 h-4" />
              <span>Generate Image</span>
            </button>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">About me:</h3>
            
            <div className="space-y-2.5 grid grid-cols-2 gap-3 lg:gap-6 pb-12 lg:pb-0 w-full overflow-hidden">
              <InfoItem icon="👤" label="AGE" value="49" />
              <InfoItem icon="💪" label="BODY" value="Fit" />
              <InfoItem icon="🌍" label="ETHNICITY" value="Caucasian" />
              <InfoItem icon="🇺🇸" label="LANGUAGE" value="English" />
              <InfoItem icon="💔" label="RELATIONSHIP" value="None" />
              <InfoItem icon="💼" label="OCCUPATION" value="Successful Entrepreneur" />
              <InfoItem icon="🎯" label="HOBBIES" value="Luxury Travel, Vintage Car Collection" />
              <InfoItem icon="✨" label="PERSONALITY" value="Charismatic and Confident" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
