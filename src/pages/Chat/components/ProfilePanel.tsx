import { Diamond, Phone, Sparkles, ChevronDown } from 'lucide-react'

const ProfilePanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
          <Diamond className="w-4 h-4" />
          <span className="text-sm">Premium 70% OFF</span>
        </button>
        
        <button className="flex items-center space-x-2 text-pink-400 hover:bg-[#2a2a2a] px-3 py-2 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">MP</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Character Profile */}
      <div className="flex-1 p-4">
        {/* Character Image */}
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
            alt="Arthur Murphy"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Character Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Arthur Murphy</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Passionate dancer and avid gamer, blending rhythm and strategy in every move he makes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Me</span>
            </button>
            <button className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Generate Image</span>
            </button>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">About me:</h3>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">AGE</p>
                  <p className="text-white font-medium">30</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <span className="text-white text-sm">💪</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">BODY</p>
                  <p className="text-white font-medium">Muscular</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
