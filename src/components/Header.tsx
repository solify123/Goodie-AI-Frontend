const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          GirlsAnimeGuys
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 lg:space-x-4">
          <button className="bg-pink-500 text-white px-3 lg:px-6 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm lg:text-base">
            Create Free Account
          </button>
          <button className="border border-pink-500 text-white px-3 lg:px-6 py-2 rounded-lg font-medium hover:bg-pink-500 hover:text-white transition-colors text-sm lg:text-base">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
