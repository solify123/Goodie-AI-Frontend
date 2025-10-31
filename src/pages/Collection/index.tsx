import { ChevronDown, Image as ImageIcon } from 'lucide-react'
import Layout from '../../components/layout'

const CollectionPage = () => {

  return (
    <Layout>
      <div className="p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-2xl md:text-[24px] sm:text-[18px] xs:text-[14px] font-bold text-white">My Collection</h1>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm sm:block hidden">Sort by</span>
            <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white hover:bg-[#2a2a2a] transition-colors">
              <span className="text-sm">Latest</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {/* Character Card */}
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors w-64">
            {/* Card Header */}
            <div className="p-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                {/* Profile Picture */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AM</span>
                </div>

                {/* Character Info */}
                <div className="flex-1">
                  <h3 className="text-white font-medium text-xs">Arthur Murphy</h3>
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <ImageIcon className="w-3 h-3" />
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Image */}
            <div className="aspect-[3/4] relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                alt="Arthur Murphy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Footer */}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">2 days ago</span>
                <div className="flex space-x-1">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CollectionPage
