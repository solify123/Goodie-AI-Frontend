import { Home, Compass, Sparkles, MessageCircle, Diamond } from 'lucide-react'

const BottomNavigation = () => {
    return (
        <>
            {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 md:hidden z-40" style={{ height: '70px', paddingBottom: 'env(safe-area-inset-bottom)' }}>
                    <div className="flex items-center justify-around h-full px-1">
                        <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
                            <Home className="w-5 h-5" />
                            <span className="text-xs">Home</span>
                        </button>
                        <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
                            <Compass className="w-5 h-5" />
                            <span className="text-xs">Discover</span>
                        </button>
                        <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-gray-400 flex-1">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs">Create</span>
                        </button>
                        <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 text-[#009688] rounded-lg flex-1">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-xs">Chat</span>
                        </button>
                        <button className="flex flex-col items-center justify-center space-y-1 px-2 py-1 bg-gradient-to-r from-purple-500 via-[#00bfa5] to-orange-500 rounded-lg flex-1">
                            <Diamond className="w-5 h-5 text-amber-400" />
                            <span className="text-xs text-white font-medium">Premium</span>
                        </button>
                    </div>
                </div>
        </>
    )
}

export default BottomNavigation;