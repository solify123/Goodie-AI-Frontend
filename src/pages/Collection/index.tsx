import { ArrowDownWideNarrow, Image as ImageIcon, ChevronRight, X, ChevronLeft } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Layout from '../../components/layout'
import BottomNavigation from '../../components/layout/BottomNavigation'

interface Character {
  id: number
  name: string
  avatar: string
  images: string[]
}

const CollectionPage = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedSort, setSelectedSort] = useState('Newest first')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  // Sample character data
  const characters: Character[] = [
    {
      id: 1,
      name: 'Charles Weston',
      avatar: 'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
      images: [
        'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
        'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90'
      ]
    },
    {
      id: 2,
      name: 'Arthur Murphy',
      avatar: 'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90',
      images: [
        'https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90'
      ]
    }
  ]

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

  // Handle keyboard navigation for modal
  useEffect(() => {
    if (showImageModal && modalCharacter) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowImageModal(false)
        } else if (event.key === 'ArrowLeft') {
          setSelectedImageIndex((prev) => {
            if (prev === 0) {
              return modalCharacter.images.length - 1
            }
            return prev - 1
          })
        } else if (event.key === 'ArrowRight') {
          setSelectedImageIndex((prev) => {
            if (prev === modalCharacter.images.length - 1) {
              return 0
            }
            return prev + 1
          })
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showImageModal, modalCharacter])

  // Handle opening image modal
  const handleImageClick = (character: Character, imageIndex: number) => {
    setModalCharacter(character)
    setSelectedImageIndex(imageIndex)
    setShowImageModal(true)
  }

  // Handle closing modal
  const handleCloseModal = () => {
    setShowImageModal(false)
  }

  // Handle previous image
  const handlePreviousImage = () => {
    if (modalCharacter) {
      setSelectedImageIndex((prev) => {
        if (prev === 0) {
          return modalCharacter.images.length - 1
        }
        return prev - 1
      })
    }
  }

  // Handle next image
  const handleNextImage = () => {
    if (modalCharacter) {
      setSelectedImageIndex((prev) => {
        if (prev === modalCharacter.images.length - 1) {
          return 0
        }
        return prev + 1
      })
    }
  }

  const sortOptions = [
    'Newest first',
    'Oldest first',
    'A-Z by name'
  ]

  // If a character is selected, show the character detail view
  if (selectedCharacter) {
    return (
      <Layout>
        <div className="mx-auto w-full">
          {/* Page Header with Breadcrumb */}
          <div className="flex items-center justify-between mb-8 p-6 lg:py-6 border-b border-gray-800">
            <div className="lg:max-w-7xl w-full mx-auto flex items-center justify-between">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="text-white hover:text-gray-400 transition-colors font-bold text-[16px] lg:text-2xl md:text-[24px] sm:text-[18px] xs:text-[14px]"
                >
                  My Collection
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0">
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h1 className="text-[14px] lg:text-2xl md:text-[24px] sm:text-[18px] xs:text-[14px] font-bold text-white">
                    {selectedCharacter.name}
                  </h1>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-sm text-white font-semibold lg:block hidden">Sort by</span>
                  <ArrowDownWideNarrow className="w-4 h-4 text-white" />
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

          {/* Character Images Grid */}
          <div className="pb-24 md:pb-8 px-8 2xl:px-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 lg:max-w-7xl w-full mx-auto" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>
            {selectedCharacter.images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(selectedCharacter, index)}
                className="w-full cursor-pointer"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={image}
                    alt={`${selectedCharacter.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg relative z-10 object-top"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && modalCharacter && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCloseModal}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Left Navigation Arrow */}
              {modalCharacter.images.length > 1 && (
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 w-12 lg:w-20 h-12 lg:h-20 border-1 border-white bg-[#1a1a1a]/80 hover:bg-[#2a2a2a]/80 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-10 h-10 lg:w-12 lg:h-12" />
                </button>
              )}

              {/* Right Navigation Arrow */}
              {modalCharacter.images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 w-12 lg:w-20 h-12 lg:h-20 border-1 border-white bg-[#1a1a1a]/80 hover:bg-[#2a2a2a]/80 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
                >
                  <ChevronRight className="w-10 h-10 lg:w-12 lg:h-12" />
                </button>
              )}

              {/* Main Image */}
              <div className="relative w-full sm:w-[400px] md:w-[500px] lg:max-w-[600px] max-h-[90vh] flex items-center justify-center">
                <img
                  src={modalCharacter.images[selectedImageIndex]}
                  alt={`${modalCharacter.name} ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg object-top"
                />
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

            </div>
          </div>
        )}
        <BottomNavigation />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 p-6 lg:py-6 border-b border-gray-800">
          <div className="lg:max-w-7xl w-full mx-auto flex items-center justify-between">
            <h1 className="text-[16px] lg:text-2xl w-7xl md:text-[24px] sm:text-[18px] xs:text-[14px] font-bold text-white">My Collection</h1>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 w-[90px] justify-end cursor-pointer"
              >
                <span className="text-sm font-semibold mr-2 hidden sm:block">Sort by</span>
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
        <div className="pb-24 md:pb-8 px-8 2xl:px-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 lg:gap-7 lg:max-w-7xl w-full mx-auto" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => setSelectedCharacter(character)}
              className="cursor-pointer hover:border-gray-700 transition-colors w-full"
            >
              {/* Card Header */}
              <div className="pb-2">
                <div className="flex items-center space-x-2">
                  {/* Profile Picture */}
                  <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0">
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Character Info */}
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-xs">{character.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <ImageIcon className="w-3 h-3" />
                      <span className="font-bold">{character.images.length}</span>
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
                    src={character.images[0]}
                    alt={character.name}
                    className="w-full h-full object-cover rounded-lg relative z-10 object-top"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {showImageModal && modalCharacter && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCloseModal}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Navigation Arrow */}
              {modalCharacter.images.length > 1 && (
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 w-12 h-12 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a]/80 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Right Navigation Arrow */}
              {modalCharacter.images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 w-12 h-12 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a]/80 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Main Image */}
              <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
                <img
                  src={modalCharacter.images[selectedImageIndex]}
                  alt={`${modalCharacter.name} ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg object-top"
                />
              </div>

              {/* Bottom Navigation Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-sm py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    {modalCharacter.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePreviousImage}
                          className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-white font-medium text-sm">
                          {modalCharacter.name}
                        </span>
                        <button
                          onClick={handleNextImage}
                          className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {modalCharacter.images.length === 1 && (
                      <span className="text-white font-medium text-sm">
                        {modalCharacter.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNavigation />
    </Layout>
  )
}

export default CollectionPage
