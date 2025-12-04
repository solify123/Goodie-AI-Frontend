import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

interface Character {
  name: string
  age: string
  description: string
  defaultImage: string
  hoverImage: string
}

interface CharacterDiscoverCardProps {
  character: Character
}

const CharacterDiscoverCard = ({ character }: CharacterDiscoverCardProps) => {
    const navigate = useNavigate()

    const likesCount = useMemo(() => {
        const min = 2500
        const max = 9500
        return Math.floor(Math.random() * (max - min + 1)) + min
    }, [])

    const backgroundImage = character?.hoverImage || character?.defaultImage || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80'

    return (
        <div className="relative w-full bg-black text-white overflow-hidden h-[calc(100vh-100px)] md:rounded-3xl">
            <img
                src={backgroundImage}
                alt={character?.name ?? 'AI Companion'}
                className="absolute inset-0 h-full w-full object-cover object-[0_-3rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

            <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-6">
                <header className="flex items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{character?.name ?? 'AI Companion'}</h2>
                        <p className="text-sm text-white/80">{character?.age} years old</p>
                    </div>
                </header>

                <main className="flex-1 flex items-end">
                    <p className="text-base text-white/90 leading-relaxed max-w-[90%]">
                        {character?.description}
                    </p>
                </main>

                <footer className="flex items-center justify-between">
                    <div className="flex items-center gap-4 rounded-full bg-black/50 px-4 py-3 backdrop-blur">
                        <img
                            src={character?.defaultImage}
                            alt={character?.name ?? 'AI Companion'}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-base font-semibold">{character?.name ?? 'Zoe'}</p>
                            <button
                                type="button"
                                onClick={() => navigate('/chat')}
                                className="text-sm font-medium text-[#00FFC6] hover:text-[#00D9A3] transition-colors"
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
                </footer>
            </div>
        </div>
    )
}

export default CharacterDiscoverCard