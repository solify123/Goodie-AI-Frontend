import Layout from '../../components/layout'
import { Sparkles, Shell, ArrowLeft, Venus, Mars, Telescope, HeartPulse, ImageDown } from 'lucide-react'

const GenerateImagePage = () => {
  const characters = [
    {
      id: 1,
      name: 'Charles',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
      description: 'Professional businessman with dark hair and beard'
    },
    {
      id: 2,
      name: 'Erik',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
      description: 'Casual style with light brown hair and bomber jacket'
    },
    {
      id: 3,
      name: 'John',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face',
      description: 'Older gentleman with gray hair and overalls'
    },
    {
      id: 4,
      name: 'Malik',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
      description: 'Smiling professional with short dark hair'
    },
    {
      id: 5,
      name: 'Victor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face',
      description: 'Long blonde hair with crossed arms'
    },
    {
      id: 6,
      name: 'Ethan',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face',
      description: 'Formal tuxedo with curly light brown hair'
    },
    {
      id: 7,
      name: 'Jin',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face',
      description: 'Asian professional in black suit'
    },
    {
      id: 8,
      name: 'Kenji',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop&crop=face',
      description: 'Smiling Asian professional in white shirt'
    }
  ]

  return (
    <Layout>
      <div className="generate-image-page w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Navigation Bar */}
        <div className="space-y-7 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a data-turbo-frame="_top" className="h-11 w-12 rounded-md bg-[#1a1a1a] flex justify-center items-center gap-2.5 border-2 border-transparent hover:bg-[#2e2e2e] hover:border-[#959595]/10 transition-all ease-in-out text-white" href="/generate-image?profile_slug=charles-weston">
                <ArrowLeft />
              </a>
              <div className="hidden lg:block">
                <div className="bg-[#1a1a1a] rounded-xl p-2">
                  <div className="grid grid-cols-3 lg:gap-5">
                    <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=female&origin=system&profile_id=2105870">
                      <Venus />
                      <div>Girls</div>
                    </a>

                    <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=anime&gender=female&origin=system&profile_id=2105870">
                      <Shell />
                      <div>Anime</div>
                    </a>

                    <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696] bg-[#1d1d35] ring-2 img-generator-option text-white" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=system&profile_id=2105870">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Mars />
                      </div>
                      <div>Guys</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white text-center px-3">
              <div className="flex items-center gap-2">
                <ImageDown />
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-semibold text-nowrap">
                    Generate Image
                  </h2>
                  <p className="text-[14px] leading-5 text-nowrap">
                    Choose character
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <div className="bg-[#1a1a1a] rounded-xl p-2">
                  <div className="grid grid-cols-2 lg:gap-1">
                    <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696] bg-[#1d1d35] ring-2 img-generator-option text-white" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=system&profile_id=2105870">
                      <div className="flex items-center justify-center w-5 h-5">
                        <Telescope />
                      </div>
                      <div>Discovery</div>
                    </a>
                    <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=user&profile_id=2105870">
                      <HeartPulse />
                      <div>My AI's</div>
                    </a>
                  </div>
                </div>
              </div>

              <div data-controller="toggle" data-toggle-css-class-value="hidden" className="relative">
                <div data-action="click->toggle#toggle" className="h-11 w-12 rounded-md bg-[#1a1a1a] flex justify-center items-center gap-2.5 border-2 border-transparent hover:bg-[#2e2e2e] hover:border-[#959595]/10 transition-all ease-in-out text-white">
                  <Sparkles />
                </div>

                <div data-toggle-target="toggleComponent" className="absolute right-0 mt-3 w-64 bg-[#1D1D1E] border border-[#2E2E2E] hover:bg-[#384151] hover:border-[#465268] rounded-md z-50 hidden">
                  <a data-turbo-frame="_top" className="px-4 py-2 w-full font-semibold text-white transition-all duration-300 inline-flex items-center gap-2 group" href="/characters/new">
                    <img className="w-[18px] h-[18px] group-hover:opacity-0 transition-opacity duration-500" src="/assets/home/magic-wand-bc43a2a37c108cc6308370c0e6fada5385fd848143063f66116694fd9aa075b7.svg" alt="Magic wand" />
                    <img className="w-[18px] h-[18px] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500" src="/assets/image-generator-v2/character-selection/star-21ddf1bba9820c1a4b5328d93af9eeb43903815a769ec3fb987b2b956207a833.svg" alt="Star" />
                    Create an AI character
                  </a>
                </div>
              </div>
            </div>


          </div>
          <div className="space-y-4 lg:hidden">
            <div className="bg-[#1a1a1a] rounded-xl p-2">
              <div className="grid grid-cols-3 lg:gap-5">
                <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=female&origin=system&profile_id=2105870">
                  <Venus />
                  <div>Girls</div>
                </a>

                <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=anime&gender=female&origin=system&profile_id=2105870">
                  <Shell />
                  <div>Anime</div>
                </a>

                <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696] bg-[#1d1d35] ring-2 img-generator-option text-white" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=system&profile_id=2105870">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Mars />
                  </div>
                  <div>Guys</div>
                </a>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-2">
              <div className="grid grid-cols-2 lg:gap-1">
                <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696] bg-[#1d1d35] ring-2 img-generator-option text-white" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=system&profile_id=2105870">
                  <Telescope />
                  <div>Discovery</div>
                </a>
                <a className="px-2 py-2 lg:py-1 justify-center items-center gap-2 flex rounded-md text-[#969696]" data-action="click->character-selection#resetSelection" href="/generate-image/characters?category=realistic&gender=male&origin=user&profile_id=2105870">
                  <HeartPulse />
                  <div>My AI's</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-2 py-6">
            {/* Character Grid */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {characters.map((character) => (
                <div key={character.id} className="relative group cursor-pointer">
                  {/* Character Image */}
                  <div className="aspect-[3/4] relative rounded-[1.2rem] overflow-hidden">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-300"
                    />

                    {/* Character Name Overlay */}
                    <h3 className="absolute bottom-0 left-0 right-0 bg-black/50 rounded-[1.2rem] m-3 p-2 text-white font-medium text-sm text-center">
                      {character.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default GenerateImagePage