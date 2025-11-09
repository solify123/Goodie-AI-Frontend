import { Home, Compass, Sparkles, MessageCircle, Gem } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(path)
    }

    return (
        <>
            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 md:hidden z-40" style={{ height: '70px', paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <div className="flex items-center justify-around h-full px-1">
                    <button 
                        onClick={() => navigate('/')}
                        className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 flex-1 transition-colors ${
                            isActive('/') ? 'text-[#009688]' : 'text-gray-400'
                        }`}
                    >
                        <Home className="w-5 h-5" />
                        <span className="text-xs">Home</span>
                    </button>
                    <button 
                        onClick={() => navigate('/discover')}
                        className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 flex-1 transition-colors ${
                            isActive('/discover') ? 'text-[#009688]' : 'text-gray-400'
                        }`}
                    >
                        <Compass className="w-5 h-5" />
                        <span className="text-xs">Discover</span>
                    </button>
                    <button 
                        onClick={() => navigate('/create-character')}
                        className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 flex-1 transition-colors ${
                            isActive('/create-character') ? 'text-[#009688]' : 'text-gray-400'
                        }`}
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="text-xs">Create</span>
                    </button>
                    <button 
                        onClick={() => navigate('/chat')}
                        className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 rounded-lg flex-1 transition-colors ${
                            isActive('/chat') ? 'text-[#009688]' : 'text-gray-400'
                        }`}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs">Chat</span>
                    </button>
                    <button className="flex flex-col items-center justify-center cursor-pointer rounded-md font-semibold transition-all duration-200
                  bg-[#009688]/20 text-white border border-[#009688]/40 backdrop-blur
                  px-1 py-1.5 leading-tight px-3 text-sm shadow-[0_6px_20px_-10px_rgba(0,150,136,0.45)]
                  hover:bg-[#009688]/30 hover:border-[#009688]/60 hover:shadow-[0_10px_30px_-12px_rgba(0,150,136,0.6)] whitespace-nowrap">
                        <Gem className="w-5 h-5 text-amber-400" />
                        <span className="text-xs text-white font-medium">Premium</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default BottomNavigation;