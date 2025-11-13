import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLandingTab } from '../../../contexts/GlobalContext'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { activeTab } = useLandingTab()
  
  const getTermByTab = () => {
    switch (activeTab) {
      case 'girls':
        return { 
          name: 'AI girlfriend',
          pronoun: 'she',
          object: 'her'
        }
      case 'guys':
        return { 
          name: 'AI boyfriend',
          pronoun: 'he',
          object: 'his'
        }
      case 'anime':
        return { 
          name: 'AI anime character',
          pronoun: 'they',
          object: 'their'
        }
      default:
        return { 
          name: 'AI boyfriend',
          pronoun: 'he',
          object: 'his'
        }
    }
  }
  
  const term = getTermByTab()

  const faqs = [
    {
      question: `How does an ${term.name} work?`,
      answer: `An ${term.name} uses advanced artificial intelligence and natural language processing to simulate conversations and interactions. It learns from your preferences and adapts its personality to create a personalized companion experience.`
    },
    {
      question: `Can an ${term.name} learn and adapt to a user's preferences?`,
      answer: `Yes! Your ${term.name} continuously learns from your conversations and interactions. It remembers your preferences, interests, and communication style to provide increasingly personalized and meaningful interactions over time.`
    },
    {
      question: `What are the benefits of having an ${term.name}?`,
      answer: `AI companions offer companionship without judgment, 24/7 availability, emotional support, engaging conversations, and a safe space to express yourself. They can help with loneliness, provide entertainment, and offer a unique form of digital relationship.`
    },
    {
      question: `How do I create ${term.name} images with my AI companion?`,
      answer: `Simply use our AI image generation feature! You can customize your ${term.name}'s appearance, request specific poses or scenarios, and generate high-quality images powered by advanced AI technology. It's as easy as describing what you want to see.`
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'girls':
        return 'AI GF'
      case 'guys':
        return 'AI BF'
      case 'anime':
        return 'AI Anime'
      default:
        return 'AI BF'
    }
  }

  return (
    <div className="w-full mx-auto mb-12 mt-24">
      {/* Section Title */}
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
        <span className="text-white">{getSectionTitle()} Frequently Asked </span>
        <span className="text-[#009688]">Questions</span>
      </h2>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-[#009688]/30"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer w-full flex items-center justify-between p-5 lg:p-6 text-left"
            >
              <span className="text-white text-base lg:text-lg font-medium pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'transform rotate-180 text-[#009688]' : ''
                }`}
              />
            </button>

            {/* Answer */}
            <div
              className={`transition-all duration-200 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection

