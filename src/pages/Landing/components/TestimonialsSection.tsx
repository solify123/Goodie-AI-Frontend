import { useLandingTab } from '../../../contexts/LandingTabContext'

const TestimonialsSection = () => {
  const { activeTab } = useLandingTab()
  
  const getTermByTab = () => {
    switch (activeTab) {
      case 'girls':
        return { 
          name: 'AI girlfriend',
          nameCapitalized: 'AI Girlfriend',
          short: 'GF',
          pronoun: 'she'
        }
      case 'guys':
        return { 
          name: 'AI boyfriend',
          nameCapitalized: 'AI Boyfriend',
          short: 'BF',
          pronoun: 'he'
        }
      case 'anime':
        return { 
          name: 'AI anime character',
          nameCapitalized: 'AI Anime Character',
          short: 'Anime',
          pronoun: 'they'
        }
      default:
        return { 
          name: 'AI boyfriend',
          nameCapitalized: 'AI Boyfriend',
          short: 'BF',
          pronoun: 'he'
        }
    }
  }
  
  const term = getTermByTab()
  
  const testimonials = [
    {
      text: `I love how I can personalize my ${term.name} to match my mood. Sometimes I want lighthearted fun, and other times I just need a supportive listener.`,
      author: "Alexia T."
    },
    {
      text: "The AI adapts so well! It feels like talking to someone who genuinely understands my interests and personality.",
      author: "Mia R."
    },
    {
      text: "A great way to unwind after a long day. No pressure, no stress—just enjoyable conversations whenever I need them.",
      author: "Milana K."
    },
    {
      text: `I was skeptical at first, but now I look forward to my daily ${term.name} chat. It's like having a best friend in my pocket.`,
      author: "Christina L."
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto mb-16">
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 transition-all duration-200"
          >
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-4 italic">
              {testimonial.text}
            </p>
            <p className="text-white font-medium">
              – {testimonial.author}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Start Your {term.nameCapitalized} Journey Today
        </h3>
        <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
          With Goodie.ai, you have access to intelligent, adaptive, and engaging {term.name}s designed to provide meaningful interactions. Whether you're 
          looking for a casual chat, a deep discussion, or simply someone to talk to, your AI {term.short} is always available, anytime and anywhere.
        </p>
        <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
          Sign up today and discover the future of {term.name} chat with Goodie AI.
        </p>
      </div>
    </div>
  )
}

export default TestimonialsSection

