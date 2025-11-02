import { useState } from 'react'
import Layout from '../../components/layout'
import { Wand2, RefreshCw, Plus, Camera, Dices, NotebookPen } from 'lucide-react'
import gem from '../../assets/images/Gem.svg'
import dot1_1 from '../../assets/images/dots/1-1.svg'
import dot1_2 from '../../assets/images/dots/1-2.svg'
import dot2_1 from '../../assets/images/dots/2-1.svg'
import dot2_2 from '../../assets/images/dots/2-2.svg'
import dot3_1 from '../../assets/images/dots/3-1.svg'
import dot3_2 from '../../assets/images/dots/3-2.svg'
import dot4_1 from '../../assets/images/dots/4-1.svg'
import dot4_2 from '../../assets/images/dots/4-2.svg'
import dot5_1 from '../../assets/images/dots/5-1.svg'
import dot5_2 from '../../assets/images/dots/5-2.svg'


const GenerateImagePage = () => {
    const [selectedCharacter] = useState('Charles Weston')
    const [prompt, setPrompt] = useState('Standing against a graffiti-covered wall, wearing a leather jacket and ripped jeans, with a rebellious look.')
    const [activeTab, setActiveTab] = useState('Action')
    const [selectedCount, setSelectedCount] = useState(1)
    const [showVideoToggle, setShowVideoToggle] = useState(true)

    const suggestions = {
        Action: ['Working out', 'Dining', 'Jogging', 'Tanning', 'Sleeping', 'Walking'],
        Pose: ['Hands in pockets', 'Arms crossed', 'Pointing', 'Waving', 'Peace sign'],
        Outfit: ['Swim trunks', 'Hoodie', 'Jeans', 'T-shirt', 'Bomber jacket', 'Pajama pants'],
        Accessories: ['Sunglasses', 'Watch', 'Hat', 'Bag', 'Jewelry'],
        Scene: ['Beach', 'City', 'Nature', 'Indoor', 'Street']
    }

    const countOptions = [1, 4, 16, 32, 64]
    const isPremiumCount = (count: number) => count > 1

    const getImageByCount = (count: number) => {
        switch (count) {
            case 1:
                if (selectedCount !== 1) {
                    return dot1_1
                } else {
                    return dot1_2
                }
            case 4:
                if (selectedCount !== 4) {
                    return dot2_1
                } else {
                    return dot2_2
                }
            case 16:
                if (selectedCount !== 16) {
                    return dot3_1
                } else {
                    return dot3_2
                }
            case 32:
                if (selectedCount !== 32) {
                    return dot4_1
                } else {
                    return dot4_2
                }
            case 64:
                if (selectedCount !== 64) {
                    return dot5_1
                } else {
                    return dot5_2
                }
            default:
                return dot1_1
        }
    }

    return (
        <Layout>
            <div className="w-full h-full flex">
                {/* Left Panel - Generate Image Controls */}
                <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-6">
                        <Camera className="w-6 h-6 text-white" />
                        <h1 className="text-2xl font-bold text-white">Generate Image</h1>
                    </div>

                    {/* Character Selection and Prompt Input */}
                    <div className="mb-6 flex space-x-4 w-full">
                        {/* Character Selection */}
                        <div className="flex-shrink-0 w-1/3">
                            <div className="relative w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                                    alt={selectedCharacter}
                                    className="w-full aspect-[1/1] rounded-lg object-cover"
                                />
                                <button className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                                    <RefreshCw className="w-5 h-5 text-gray-400" />
                                </button>

                                {/* Character Name */}
                                <div className="w-full absolute bottom-0 left-0 pl-3 pb-3 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                                    <p className="text-white font-medium">{selectedCharacter}</p>
                                </div>
                            </div>
                        </div>

                        {/* Prompt Input */}
                        <div className="flex-1 relative w-2/3">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full h-full bg-[#1a1a1a] transition-all duration-500 focus:shadow-lg focus:shadow-pink-500/20 rounded-lg px-4 py-5 pr-10 pl-12 text-white text-sm focus:outline-2 focus:outline-pink-700 resize-none "
                            />
                            <button className="absolute bottom-3 right-4 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                                <Dices className="w-full h-full text-pink-300" />
                            </button>
                            <button className="absolute top-6 left-5 w-5 h-5 rounded-lg flex items-center justify-center cursor-pointer">
                                <NotebookPen className="w-full h-full text-gray-300" />
                            </button>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="flex justify-start items-center">
                        <h3 className="text-white font-medium mb-3">Suggestions</h3>

                        {/* Tabs */}
                        <div className="lg:ml-8 md:ml-4 ml-2 flex space-x-1 mb-3 overflow-x-auto">
                            {['Action', 'Pose', 'Outfit', 'Accessories', 'Scene'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-2 py-1 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'text-white border-b-2 border-pink-700'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                    </div>
                    {/* Suggestion Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {suggestions[activeTab as keyof typeof suggestions].map((item, index) => (
                            <button
                                key={index}
                                className="flex items-center cursor-pointer space-x-1 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-gray-600 transition-colors text-sm"
                            >
                                <Plus className="w-3 h-3" />
                                <span>{item}</span>
                            </button>
                        ))}
                    </div>

                    {/* Number of Images */}
                    <div className="mb-6">
                        <h3 className="text-white font-medium mb-3">Number of images</h3>
                        <div className="flex flex-wrap gap-2 w-full justify-between items-center">
                            {countOptions.map((count) => (
                                <button
                                    key={count}
                                    onClick={() => setSelectedCount(count)}
                                    className={`relative flex items-center justify-center cursor-pointer w-[18%] space-x-1 bg-[#1a1a1a] px-4 py-2 rounded-[5px] text-sm font-medium transition-colors ${selectedCount === count
                                        ? 'text-white outline-2 outline-[#4346e6]'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <div className='flex items-center space-x-2'>
                                        <img src={getImageByCount(count) as string} alt="Dot" className="w-5 h-5" />
                                        <span>{count}</span>
                                    </div>
                                    <div>
                                        {isPremiumCount(count) && (
                                            <img src={gem} alt="Gem" className="absolute top-0 right-[-1px] w-6 h-6" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer">
                        <Wand2 className="w-5 h-5" />
                        <span>Generate Image</span>
                    </button>
                </div>

                {/* Right Panel - Generated Images */}
                <div className="hidden lg:block w-1/2 bg-[#0f0f0f] p-6 overflow-y-auto">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Generated Images</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Here, you can find your images. You can leave the page or start a new series while others are still loading.
                        </p>

                        {/* Video Toggle */}
                        <div className="flex items-center justify-between mb-6 p-3 bg-[#1a1a1a] rounded-lg border border-gray-800">
                            <div className="flex items-center space-x-2">
                                <Camera className="w-5 h-5 text-gray-400" />
                                <span className="text-white text-sm">Show images you can turn into video</span>
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setShowVideoToggle(!showVideoToggle)}
                                    className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${showVideoToggle ? 'bg-blue-500' : 'bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showVideoToggle ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Generated Image Display */}
                        <div className="space-y-4 w-full grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-rows-fr">
                            <div className="aspect-[2/3] relative rounded-3xl overflow-hidden bg-[#1a1a1a]">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                                    alt="Generated"
                                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-300 rounded-3xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default GenerateImagePage