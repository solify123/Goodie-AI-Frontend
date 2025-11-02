import { ArrowDownWideNarrow, Image as ImageIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Layout from '../../components/layout'

const CollectionPage = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedSort, setSelectedSort] = useState('Newest first')
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sortOptions = [
    'Newest first',
    'Oldest first',
    'A-Z by name'
  ]

  return (
    <Layout>
      <div className="mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 p-6 lg:py-6 border-b border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl lg:text-2xl w-7xl md:text-[24px] sm:text-[18px] xs:text-[14px] font-bold text-white">My Collection</h1>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 w-[90px] justify-between cursor-pointer"
              >
                <span className="text-sm font-semibold mr-1 hidden sm:block">Sort by</span>
                <ArrowDownWideNarrow className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg min-w-[160px] py-1 z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedSort(option)
                        setShowSortDropdown(false)
                        // Handle sort logic
                        console.log('Sort by:', option)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors flex items-center space-x-3 cursor-pointer"
                    >
                      {selectedSort === option && (
                        <span className="text-green-500">✓</span>
                      )}
                      {selectedSort !== option && (
                        <span className="w-4"></span>
                      )}
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="pb-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 lg:gap-7 max-w-7xl mx-auto">
          {/* Character Card */}
          <div className="cursor-pointer hover:border-gray-700 transition-colors w-full">
            {/* Card Header */}
            <div className="pb-2">
              <div className="flex items-center space-x-2">
                {/* Profile Picture */}
                <div className="w-8 h-8 rounded-full from-blue-500 to-purple-600 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                    alt="Arthur Murphy"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Character Info */}
                <div className="flex-1">
                  <h3 className="text-white font-medium text-xs">Arthur Murphy</h3>
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <ImageIcon className="w-3 h-3" />
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Character Image */}
              <div className="aspect-[2/3] relative">
                <div className="absolute w-[98%] h-full bg-[#2D2D2D] rounded-lg top-2 left-2 lg:top-3 lg:left-4"></div>
                <div className="absolute w-[98%] h-full bg-[#474747] rounded-lg top-1 left-1 lg:top-[6px] lg:left-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                  alt="Arthur Murphy"
                  className="w-full h-full object-cover rounded-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CollectionPage
