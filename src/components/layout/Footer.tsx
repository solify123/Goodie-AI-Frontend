import { Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] border-t border-gray-800 mt-10">
      <div className="flex footer-bg-banner mb-10 lg:mb-0 justify-between w-full">
        <div className="flex flex-1 flex-col-reverse text-center lg:text-start lg:flex-row
      lg:gap-[86px] gap-[35px] max-w-7xl mx-auto lg:px-5 md:px-10 text-white
      py-10 px-5">
          <div className="flex lg:max-w-[427px]">
            <div className="flex flex-col lg:flex-1 lg:gap-7 w-full gap-10 md:mb-0 mb-5">
              <div className="flex lg:flex-none flex-1">
                <div className="flex flex-col lg:items-start items-center gap-6 flex-1">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-2xl font-bold">goodie</span>
                      <span className="text-[#009688] text-2xl font-bold">.ai</span>
                      <span className="text-gray-500 text-sm">®</span>
                    </div>
                    <div className="flex justify-end">

                      <button data-controller="toggle-modal" data-action="toggle-modal#openModal" data-toggle-modal-modal-outlet="#language-select-modal" className="flex gap-2 items-center border cursor-pointer text-grey-medium text-xs font-medium w-full justify-start px-3 py-[9px] rounded-[10px] border-white/10 hover:bg-zinc-700">
                        <Globe />
                        <div>English</div>
                      </button>

                    </div>
                  </div>
                  <p className="text-[#E1E1E1] text-sm lg:text-start text-center">
                    Candy AI powers immersive experiences that feel real, allowing users to generate images and create AI characters.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 lg:flex-none flex-1">
                <div className="text-grey-default text-sm font-medium leading-6 text-white/70">
                  Contacts:
                </div>
                <p className="text-sm text-grey-light leading-6 font-medium lg:text-start text-center">
                  EverAI Limited, Nr. C107181 56 Central Business Centre, Triq Is-Soll, Santa Venera SVR 1833, Malta
                </p>
              </div>

              <div className="flex lg:justify-start justify-center items-center gap-4">
                <span className="text-grey-default text-sm font-medium leading-6 text-white/70">
                  © 2025 Candy.ai. All Rights Reserved
                  -
                  <a className="underline" href="/sitemap.xml">Sitemap</a>
                  <br />
                </span>
              </div>
            </div>
          </div>
          <div className="flex lg:w-full justify-between lg:flex-nowrap flex-wrap">
            <div className="flex justify-between lg:max-w-[300px] w-full md:mb-0 mb-5">
              <div className="flex flex-col min-w-[100px] text-start gap-5">
                <div className="text-grey-default text-sm block text-white/70">
                  Features
                </div>
                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" data-turbo-frame="_top" href="/generate-image">
                  Generate Image
                </a>
                <a className="cursor-pointer text-white text-sm font-medium" href="/ai-boyfriend/ethan-vale">
                  Chat
                </a>
                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" data-turbo-frame="_top" href="/characters/new">
                  Create Character
                </a>
                <a className="cursor-pointer text-white text-sm font-medium" data-turbo-frame="_top" href="/collection">
                  Gallery
                </a>
                <a className="cursor-pointer text-white text-sm font-medium" data-turbo-frame="_top" href="/characters">
                  My AI
                </a>
              </div>
              <div className="flex flex-col text-start min-w-[100px] gap-5 lg:pl-2">
                <div className="text-grey-default text-sm block text-white/70">
                  Popular
                </div>

                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" href="https://candy.ai/">Candy AI</a>
                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" href="/ai-girlfriend">AI Girlfriend</a>
                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" href="/ai-anime">AI Anime</a>
                <a className="cursor-pointer whitespace-nowrap text-white text-sm font-medium" href="/ai-boyfriend">AI Boyfriend</a>
              </div>
            </div>

            <div className="flex lg:flex-col lg:w-auto w-full justify-between md:mb-0 mb-5">
              <div className="flex flex-col text-start gap-5">
                <div className="text-grey-default text-sm block text-white/70">
                  Legal &amp; Support
                </div>
                <a className="cursor-pointer text-white text-sm font-medium whitespace-nowrap" href="/legal-information">
                  Terms and Policies
                </a>
                <a className="cursor-pointer text-white text-sm font-medium whitespace-nowrap" href="https://everai.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">
                  Help Center
                </a>
              </div>
              <div className="relative flex flex-col min-w-[100px] text-start gap-5 lg:relative lg:bottom-[12px]">
                <div className="text-grey-default text-sm block text-white/70">
                  Social
                </div>

                <div className="flex gap-7 relative md:bottom-3">
                  <a href="https://discord.com/invite/candyai" target="_blank" rel="nofollow noopener noreferrer">
                    <img alt="Discord" className="object-cover object-center w-6 h-6" src="https://candy.ai/assets/socials/discord-1941fbdb65bbf0a7af9edf8206abc69f116e482275b867372a123372fc6b7c23.svg" />
                  </a>
                  <a href="https://twitter.com/trycandyai" target="_blank" rel="nofollow noopener noreferrer">
                    <img alt="X" className="object-cover object-center w-6 h-6" src="https://candy.ai/assets/socials/x-710fb250b6a281a788a8826269ec81a35f9a3873b084add3e0198ef826c1cb35.svg" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between lg:min-w-[180px] lg:pl-5">
              <div className="flex flex-col text-start gap-5">
                <div className="text-grey-default text-sm block text-white/70">
                  Company
                </div>
                <a className="cursor-pointer text-white text-sm font-medium" href="https://apply.workable.com">
                  We're hiring
                </a>
              </div>
              <div className="flex gap-5 lg:mt-0 mt-10">
                <img alt="Visa" className="w-[80px] h-[45px] object-cover object-center" src="https://candy.ai/assets/footer/visa-e1d8b03b25a5af3b8320ae609ba6331e0e1787c5d24d0bbcb9bfb8e88d5cdd42.svg" />
                <img alt="Mastercard" className="w-[76px] h-[45px] object-cover object-center" src="https://candy.ai/assets/footer/mastercard-a70ad911ccea0bdffda8287342443e4bb64898fecf51d8a4f86b1ecacf213e4a.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

