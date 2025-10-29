import { X, Check } from 'lucide-react'
import { useState } from 'react'

interface Language {
  name: string
  code: string
  flag: string
  selected: boolean
  supported: boolean
}

interface LanguageSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onLanguageSelect: (language: Language) => void
}

const LanguageSelectionPopup = ({ isOpen, onClose, onLanguageSelect }: LanguageSelectionPopupProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  
  const languages: Language[] = [
    { name: 'English', code: 'EN', flag: '🇺🇸', selected: selectedLanguage === 'EN', supported: true },
    { name: 'العربية', code: 'AR', flag: '🇸🇦', selected: selectedLanguage === 'AR', supported: true },
    { name: 'हिन्दी', code: 'HI', flag: '🇮🇳', selected: selectedLanguage === 'HI', supported: true },
    { name: '中文', code: 'ZH', flag: '🇨🇳', selected: selectedLanguage === 'ZH', supported: true }
  ]

  const fullySupportedLanguages = languages.filter(lang => lang.supported)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl shadow-2xl w-96 max-w-[90vw] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-white text-xl font-bold">Select your language</h2>
        </div>

        {/* Interface + Chat Section */}
        <div className="px-6 pb-4">
          <p className="text-gray-400 text-sm mb-4">Website and chat fully supported</p>
          
          <div className="space-y-2">
            {fullySupportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setSelectedLanguage(language.code)
                  onLanguageSelect(language)
                }}
                className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  language.selected
                    ? 'border-pink-500 bg-pink-500/5'
                    : 'border-transparent hover:border-gray-600 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <div className="text-left">
                    <div className={`text-sm font-medium ${
                      language.selected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {language.name}
                    </div>
                    <div className={`text-xs ${
                      language.selected ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {language.code}
                    </div>
                  </div>
                </div>
                {language.selected && (
                  <Check className="w-4 h-4 text-pink-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelectionPopup
