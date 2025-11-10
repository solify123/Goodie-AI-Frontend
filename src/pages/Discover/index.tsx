import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronUp, Heart, Loader2 } from 'lucide-react'
import characters from '../../config/girls.json' with { type: 'json' }

const DiscoverPage = () => {
  const navigate = useNavigate()

  const selectedCharacter = useMemo(() => {
    if (!characters.length) {
      return undefined
    }
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
  }, [])

  const likesCount = useMemo(() => {
    const min = 2500
    const max = 9500
    return Math.floor(Math.random() * (max - min + 1)) + min
  }, [])

  const backgroundImage =
    selectedCharacter?.hoverImage ||
    selectedCharacter?.defaultImage ||
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80'

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <img
        src={backgroundImage}
        alt={selectedCharacter?.name ?? 'AI Companion'}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      <div className="relative z-10 flex h-[100vh] w-full flex-col justify-between px-6 py-6">
        <header className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur transition hover:bg-black/80"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm text-white/70">Discover Mode</p>
            <h1 className="text-lg font-semibold">Swipe to meet your AI match</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-14 w-14 animate-spin text-white/80" />
            <p className="text-base font-medium text-white/90 text-center">Connecting with your next AI companion...</p>
          </div>
        </main>

        <footer className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <ChevronUp className="h-6 w-6" />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/80">Swipe up to continue</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 rounded-full bg-black/50 px-4 py-3 backdrop-blur">
              <img
                src={selectedCharacter?.defaultImage}
                alt={selectedCharacter?.name ?? 'AI Companion'}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-semibold">{selectedCharacter?.name ?? 'Zoe'}</p>
                <button
                  type="button"
                  onClick={() => navigate('/chat')}
                  className="text-sm font-medium text-[#00FFC6]"
                >
                  Chat Now
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-3 backdrop-blur">
              <Heart className="h-5 w-5 text-pink-400" />
              <span className="text-sm font-medium text-white/90">
                {likesCount.toLocaleString()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DiscoverPage

