import { Globe } from 'lucide-react'

const Footer = () => {
  const features = [
    'Generate Image',
    'Chat',
    'Create Character',
    'Gallery',
    'My AI'
  ]

  const popular = [
    'Goodie AI',
    'AI Girlfriend',
    'AI Anime',
    'AI Boyfriend'
  ]

  const legalSupport = [
    'Terms and Policies',
    'Help Center'
  ]

  const company = [
    'We\'re hiring'
  ]

  return (
    <footer className="w-full bg-[#1a1a1a] border-t border-gray-800 mt-16">
      <div className="max-w-[1856px] mx-auto px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white text-2xl font-bold">goodie</span>
              <span className="text-[#009688] text-2xl font-bold">.ai</span>
              <span className="text-gray-500 text-sm">®</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Goodie AI powers immersive experiences that feel real, allowing users to generate images and create AI characters.
            </p>
            
            {/* Contacts */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-2">Contacts:</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                EverAI Limited, Nr. C107181 56 Central Business Centre, Triq<br />
                Is-Soll, Santa Venera SVR 1833, Malta
              </p>
            </div>

            {/* Language Selector */}
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">English</span>
            </button>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-3">
              {features.map((item, index) => (
                <li key={index}>
                  <a href="#" className="cursor-pointer text-gray-400 text-sm hover:text-[#009688] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular</h4>
            <ul className="space-y-3">
              {popular.map((item, index) => (
                <li key={index}>
                  <a href="#" className="cursor-pointer text-gray-400 text-sm hover:text-[#009688] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              {legalSupport.map((item, index) => (
                <li key={index}>
                  <a href="#" className="cursor-pointer text-gray-400 text-sm hover:text-[#009688] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <a href="#" className="cursor-pointer text-gray-400 text-sm hover:text-[#009688] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Section */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <div className="flex items-center space-x-3">
                {/* Discord */}
                <a 
                  href="#" 
                  className="cursor-pointer w-8 h-8 rounded-full bg-[#009688] flex items-center justify-center hover:bg-[#00897b] transition-colors"
                  aria-label="Discord"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a 
                  href="#" 
                  className="cursor-pointer w-8 h-8 rounded-full bg-[#009688] flex items-center justify-center hover:bg-[#00897b] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2025 Goodie.ai. All Rights Reserved - <a href="#" className="cursor-pointer hover:text-[#009688] transition-colors">Sitemap</a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded px-3 py-2">
              <span className="text-blue-600 font-bold text-sm">VISA</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 rounded-full bg-red-500"></div>
                <div className="w-5 h-5 rounded-full bg-orange-500 -ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

