const Sidebar = () => {
  const mainFeatures = [
    'Explore',
    'Chat',
    'Collection',
    'Generate Image',
    'Create Character',
    'My AI'
  ]

  const supportLinks = [
    'English',
    'Discord',
    'Help Center',
    'Contact Us',
    'Affiliate'
  ]

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      {/* Main Features */}
      <div className="p-6 space-y-3">
        {mainFeatures.map((feature, index) => (
          <button
            key={index}
            className={`w-full text-left text-white px-4 py-3 rounded-lg transition-colors ${
              feature === 'Explore' 
                ? 'bg-gray-700 border-l-4 border-blue-400' 
                : 'hover:bg-gray-700'
            }`}
          >
            {feature}
          </button>
        ))}
        
        {/* Premium Button */}
        <button className="w-full bg-pink-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors mt-4">
          Become Premium
        </button>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-700 mx-6"></div>
      
      {/* Support Links */}
      <div className="p-6 space-y-3 flex-1">
        {supportLinks.map((link, index) => (
          <button
            key={index}
            className="w-full text-left text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {link}
          </button>
        ))}
      </div>
      
      {/* Footer Links */}
      <div className="p-6 border-t border-gray-700">
        <div className="space-y-2 text-sm text-gray-400">
          <a href="#" className="block hover:text-white transition-colors">
            Privacy Notice
          </a>
          <a href="#" className="block hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
