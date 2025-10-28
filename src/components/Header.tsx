const Header = () => {
  return (
    <header className="bg-gray-800 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Hamburger Menu + Brand + Navigation */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Brand */}
          <div className="text-white text-xl font-bold">
            candy.ai
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Girls
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Anime
            </a>
            <a href="#" className="text-white font-semibold border-b-2 border-pink-500 pb-1 text-sm">
              Guys
            </a>
          </nav>
        </div>
        
        {/* Right Side - Action Buttons */}
        <div className="flex space-x-3">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm">
            Create Free Account
          </button>
          <button className="border border-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-500 hover:text-white transition-colors text-sm">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
