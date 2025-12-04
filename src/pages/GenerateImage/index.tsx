import { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/layout'
import { Wand2, RefreshCw, Plus, Camera, Dices, NotebookPen, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
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
import SelectCharaters from './components/selectCharaters'
import { useCharacter } from '../../hooks/useCharacter'
import useGenerateImage from '../../hooks/useGenerateImage'

const GenerateImagePage = () => {
    const { getCharacters } = useCharacter()
    const { generateImage, getImages } = useGenerateImage()
    const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null)
    const [prompt, setPrompt] = useState('Standing against a graffiti-covered wall, wearing a leather jacket and ripped jeans, with a rebellious look.')
    const [activeTab, setActiveTab] = useState('Action')
    const [selectedCount, setSelectedCount] = useState(1)
    const [showVideoToggle, setShowVideoToggle] = useState(true)
    const [selectCharater, setSelectCharater] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null)
    const [charactersList, setCharactersList] = useState<any[]>([])
    const [generatedImages, setGeneratedImages] = useState<any[]>([])
    const [isLoadingImages, setIsLoadingImages] = useState(false)

    // Fetch all characters
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await getCharacters()
                if (response.success && response.data) {
                    setSelectedCharacter(response.data[0])
                    setCharactersList(Array.isArray(response.data) ? response.data : [])
                }
            } catch (error) {
                console.error('Error fetching characters:', error)
            }
        }
        fetchCharacters()
    }, [])

    // Fetch generated images
    const fetchGeneratedImages = useCallback(async (characterId?: string) => {
        setIsLoadingImages(true)
        try {
            const response = await getImages(characterId)
            if (response.success && response.images) {
                setGeneratedImages(Array.isArray(response.images) ? response.images : [])
            }
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setIsLoadingImages(false)
        }
    }, [])

    // Fetch images on mount and when character changes
    useEffect(() => {
        if (selectedCharacter?.id) {
            fetchGeneratedImages(selectedCharacter?.id)
        }
    }, [selectedCharacter?.id])

    const suggestions = {
        Action: ['Working out', 'Dining', 'Jogging', 'Tanning', 'Sleeping', 'Walking'],
        Pose: ['Hands in pockets', 'Arms crossed', 'Pointing', 'Waving', 'Peace sign'],
        Outfit: ['Swim trunks', 'Hoodie', 'Jeans', 'T-shirt', 'Bomber jacket', 'Pajama pants'],
        Accessories: ['Sunglasses', 'Watch', 'Hat', 'Bag', 'Jewelry'],
        Scene: ['Beach', 'City', 'Nature', 'Indoor', 'Street']
    }

    // Prompt mappings for each tag
    const tagPrompts: Record<string, string> = {
        // Action prompts
        'Working out': 'working out at the gym',
        'Dining': 'dining at a restaurant',
        'Jogging': 'jogging in the park',
        'Tanning': 'tanning on the beach',
        'Sleeping': 'sleeping peacefully',
        'Walking': 'walking down the street',
        // Pose prompts
        'Hands in pockets': 'with hands in pockets',
        'Arms crossed': 'with arms crossed',
        'Pointing': 'pointing forward',
        'Waving': 'waving hello',
        'Peace sign': 'showing peace sign',
        // Outfit prompts
        'Swim trunks': 'wearing swim trunks',
        'Hoodie': 'wearing a hoodie',
        'Jeans': 'wearing jeans',
        'T-shirt': 'wearing a t-shirt',
        'Bomber jacket': 'wearing a bomber jacket',
        'Pajama pants': 'wearing pajama pants',
        // Accessories prompts
        'Sunglasses': 'wearing sunglasses',
        'Watch': 'wearing a watch',
        'Hat': 'wearing a hat',
        'Bag': 'carrying a bag',
        'Jewelry': 'wearing jewelry',
        // Scene prompts
        'Beach': 'at the beach',
        'City': 'in the city',
        'Nature': 'in nature',
        'Indoor': 'indoors',
        'Street': 'on the street'
    }

    const handleTagClick = (tag: string) => {
        const tagPrompt = tagPrompts[tag] || tag.toLowerCase()
        const currentPrompt = prompt.trim()

        // If prompt is empty, just add the tag prompt
        if (!currentPrompt) {
            setPrompt(tagPrompt)
        } else {
            // Otherwise, append with a comma and space if not already there
            const separator = currentPrompt.endsWith('.') ? ' ' : ', '
            setPrompt(currentPrompt + separator + tagPrompt)
        }
    }

    const handleRandomizePrompt = () => {
        // Randomly select one item from each category
        const randomAction = suggestions.Action[Math.floor(Math.random() * suggestions.Action.length)]
        const randomPose = suggestions.Pose[Math.floor(Math.random() * suggestions.Pose.length)]
        const randomOutfit = suggestions.Outfit[Math.floor(Math.random() * suggestions.Outfit.length)]
        const randomAccessories = suggestions.Accessories[Math.floor(Math.random() * suggestions.Accessories.length)]
        const randomScene = suggestions.Scene[Math.floor(Math.random() * suggestions.Scene.length)]

        // Get prompts for each selected item
        const actionPrompt = tagPrompts[randomAction] || randomAction.toLowerCase()
        const posePrompt = tagPrompts[randomPose] || randomPose.toLowerCase()
        const outfitPrompt = tagPrompts[randomOutfit] || randomOutfit.toLowerCase()
        const accessoriesPrompt = tagPrompts[randomAccessories] || randomAccessories.toLowerCase()
        const scenePrompt = tagPrompts[randomScene] || randomScene.toLowerCase()

        // Build a natural prompt combining all elements
        // Format: Character is [action] [pose], [outfit], [accessories], [scene]
        const randomPrompt = `${actionPrompt}, ${posePrompt}, ${outfitPrompt}, ${accessoriesPrompt}, ${scenePrompt}`

        setPrompt(randomPrompt)
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

    const handleGenerateImage = async () => {
        if (isGenerating) return
        setIsGenerating(true)
        // Simulate request
        try {
            const response = await generateImage(selectedCharacter, prompt, selectedCount)
            if (response.success) {
                setShowImageModal(true)
                setModalImageUrl(response.imageUrl)
                // Refetch images to get the complete record with proper ID
                await fetchGeneratedImages(selectedCharacter?.id)
                setIsGenerating(false)
                toast.success('Image generated successfully')
            } else {
                toast.error(response.error || 'Failed to generate image')
                setIsGenerating(false)
            }
        } catch (error) {
            console.error('Error generating image:', error)
            toast.error('Failed to generate image')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleOpenImage = (src: string) => {
        setModalImageUrl(src)
        setShowImageModal(true)
    }

    const handleCloseImage = () => {
        setShowImageModal(false)
        setModalImageUrl(null)
    }

    const handleCountImage = (count: number) => {
        if (isPremiumCount(count)) {
            toast.error('You need to be a premium user to generate more than 1 image.')
        } else {
            setSelectedCount(count)
        }
    }

    return (
        <Layout>
            {
                selectCharater ? (
                    <SelectCharaters
                        charactersList={charactersList}
                        setSelectCharater={setSelectCharater}
                        onCharacterSelect={(character) => {
                            setSelectedCharacter(character)
                        }}
                        preselectedId={selectedCharacter?.id ?? null}
                    />
                ) : (
                    <>
                        <div className="w-full h-full flex flex-col lg:flex-row">
                            {/* Left Panel - Generate Image Controls */}
                            <div className="w-full lg:w-1/2 py-6 px-4 sm:px-6 lg:px-14 overflow-y-auto border-b border-gray-800 md:border-b-0">
                                {/* Header */}
                                <div className="flex items-center justify-center space-x-3 mb-6">
                                    <Camera className="w-6 h-6 text-white" />
                                    <h1 className="text-center text-white text-[22px] font-semibold leading-tight">Generate Image</h1>
                                </div>

                                {/* Character Selection and Prompt Input */}
                                <div className="mb-6 flex flex-col 2xl:flex-row 2xl:gap-0 gap-4 md:space-x-4 space-y-4 md:space-y-0 w-full">
                                    {/* Character Selection */}
                                    <div className="flex-shrink-0 w-full 2xl:w-1/3">
                                        <div className="relative w-55 mx-auto 2xl:w-full">
                                            <img
                                                src={selectedCharacter?.imgUrl}
                                                alt={selectedCharacter?.name}
                                                className="w-full aspect-[1/1] rounded-[32px] object-cover object-top"
                                            />
                                            <button onClick={() => setSelectCharater(true)} className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                                                <RefreshCw className="w-5 h-5 text-gray-400" />
                                            </button>

                                            {/* Character Name */}
                                            <div className="w-full hidden md:block absolute bottom-0 left-0 pl-3 pb-3 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                                                <p className="text-white font-medium">{selectedCharacter?.name}</p>
                                            </div>
                                        </div>
                                        <div className="w-full text-center py-3 pl-3 pb-3 md:hidden block">
                                            <p className="text-white font-medium">{selectedCharacter?.name}</p>
                                        </div>
                                    </div>

                                    {/* Prompt Input */}
                                    <div className="flex-1 relative w-full">
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full 2xl:h-full h-40 bg-[#1a1a1a] transition-all duration-500 focus:shadow-lg focus:shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] rounded-lg px-4 py-5 pr-10 pl-12 text-white text-sm focus:outline-2 focus:outline-[#009688] resize-none "
                                        />
                                        <button
                                            onClick={handleRandomizePrompt}
                                            className="absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                                            title="Randomize prompt"
                                        >
                                            <Dices className="w-full h-full text-[#80cbc4]" />
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
                                                    ? 'text-white border-b-2 border-[#009688]'
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
                                            onClick={() => handleTagClick(item)}
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
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 w-full items-center">
                                        {countOptions.map((count) => (
                                            <button
                                                key={count}
                                                onClick={() => handleCountImage(count)}
                                                className={`relative flex items-center justify-center cursor-pointer space-x-1 bg-[#1a1a1a] px-3 py-2 sm:px-4 rounded-[5px] text-sm font-medium transition-colors ${selectedCount === count
                                                    ? 'text-white outline outline-1 outline-[#009688]'
                                                    : 'text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <img src={getImageByCount(count) as string} alt="Dot" className="w-5 h-5" />
                                                    <span className='lg:hidden block xl:block'>{count}</span>
                                                </div>
                                                <div>
                                                    {isPremiumCount(count) && (
                                                        <img src={gem} alt="Gem" className="absolute top-0 right-0 w-5 h-5" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='fixed bottom-0 left-0 right-0 z-10 md:static p-3 bg-[#131313] border-t border-gray-800 md:border-t-0 md:bg-transparent md:p-0'>
                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerateImage}
                                        disabled={isGenerating}
                                        className={`w-full bg-gradient-to-r from-[#009688] to-[#00bfa5] text-white font-medium py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_6px_20px_-10px_rgba(0,150,136,0.55)] ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#00897b] hover:to-[#00a78f]'}`}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Generating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-5 h-5" />
                                                <span>Generate Image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Right Panel - Generated Images */}
                            <div className="w-full lg:w-1/2 bg-[#0f0f0f] py-6 px-4 sm:px-6 lg:px-14 overflow-y-auto md:pb-6 pb-24">
                                <div>
                                    <h2 className="text-md font-semibold">Generated Images</h2>
                                    <p className="mb-8 mt-3 text-xs leading-4 text-[#969696]">
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
                                    {isLoadingImages ? (
                                        <div className="flex items-center justify-center py-12">
                                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                        </div>
                                    ) : generatedImages.length === 0 ? (
                                        <div className="flex items-center justify-center py-12">
                                            <p className="text-gray-400 text-sm">No images generated yet. Generate your first image!</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 w-full grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 auto-rows-fr">
                                            {generatedImages.map((image) => (
                                                <div key={image.id || image.image_url} className="aspect-[2/3] relative rounded-3xl overflow-hidden bg-[#1a1a1a]">
                                                    <img
                                                        src={image.image_url}
                                                        alt="Generated"
                                                        onClick={() => handleOpenImage(image.image_url)}
                                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-300 rounded-3xl"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Image Modal */}
                        {showImageModal && modalImageUrl && (
                            <div
                                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
                                style={{ animation: 'fadeIn 0.2s ease-out' }}
                                onClick={handleCloseImage}
                            >
                                <div
                                    className="relative max-w-2xl w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] rounded-xl overflow-hidden aspect-[1/1]"
                                    style={{ animation: 'fadeInScale 0.2s ease-out' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={handleCloseImage}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer hover:bg-black/60"
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                    {/* Image */}
                                    <img
                                        src={modalImageUrl}
                                        alt="Preview"
                                        className="w-full h-auto object-contain block"
                                    />
                                    {/* Download */}
                                    <div className="absolute left-4 bottom-4">
                                        <a
                                            href={modalImageUrl}
                                            download
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-white/10 text-white hover:bg-white/10"
                                            title="Download"
                                        >
                                            ⬇
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }

        </Layout>
    )
}

export default GenerateImagePage