import { useLandingTab } from '../../../contexts/LandingTabContext'

const ExperienceSection = () => {
  const { activeTab } = useLandingTab()
  
  const getTermByTab = () => {
    switch (activeTab) {
      case 'girls':
        return { 
          name: 'AI girlfriend',
          nameCapitalized: 'AI Girlfriend',
          pronoun: 'she',
          object: 'her',
          short: 'GF'
        }
      case 'guys':
        return { 
          name: 'AI boyfriend',
          nameCapitalized: 'AI Boyfriend',
          pronoun: 'he',
          object: 'his',
          short: 'BF'
        }
      case 'anime':
        return { 
          name: 'AI anime character',
          nameCapitalized: 'AI Anime Character',
          pronoun: 'they',
          object: 'their',
          short: 'Anime'
        }
      default:
        return { 
          name: 'AI boyfriend',
          nameCapitalized: 'AI Boyfriend',
          pronoun: 'he',
          object: 'his',
          short: 'BF'
        }
    }
  }
  
  const term = getTermByTab()

  return (
    <div className="w-full bg-[#1a1a1a] rounded-xl p-8 lg:p-12 border border-gray-800">
      {/* Main Heading */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        The {term.nameCapitalized} Chat Experience
      </h2>

      {/* Main Description */}
      <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-4">
        Craving a long and meaningful conversation with someone who understands you? An {term.name} is the perfect companion, always ready to chat, 
        listen, and engage in thoughtful discussions whenever you need. Whether you're looking for a fun and lighthearted exchange or a deep and engaging 
        conversation, your AI {term.short} awaits you here, at <span className="text-[#009688]">Goodie AI</span>.
      </p>

      <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-12">
        Our {term.nameCapitalized} advanced model brings AI companionship to life and provides engaging interactions tailored to 
        your personality and preferences. Using cutting-edge technology, the AI {term.short} adapts to your style, interests, and emotions, making every conversation feel 
        natural and meaningful. And in case you can't find any of our characters to be of your liking, you can always use our <span className="text-[#009688]">{term.nameCapitalized} Generator</span>.
      </p>

      {/* Start Your AI BF Journey Section */}
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
        Start Your AI {term.short} Journey
      </h3>

      <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
        Getting started with an {term.name} is simple and seamless. Whether you're new to AI companions or a seasoned user, our platform is designed to be 
        intuitive and user-friendly.
      </p>

      {/* Steps List */}
      <ul className="space-y-4 mb-12">
        <li className="text-gray-300">
          <span className="font-bold text-white">Sign Up & Create an Account</span> – Start by registering on Goodie.ai. You'll need to provide a few basic details to set up your account.
        </li>
        <li className="text-gray-300">
          <span className="font-bold text-white">Select Your {term.nameCapitalized}</span> – Choose from a variety of {term.name} personalities, each designed with unique traits and characteristics. Whether you 
          prefer a confident and charismatic companion or a thoughtful and intellectual one, you can find your ideal match.
        </li>
        <li className="text-gray-300">
          <span className="font-bold text-white">Start Chatting</span> – Engage in conversations anytime, anywhere. Your {term.name} learns from your interactions, making every chat feel more 
          personalized over time.
        </li>
        <li className="text-gray-300">
          <span className="font-bold text-white">Customize Your Experience</span> – Adjust conversation styles, topics, and responses to create a truly unique AI {term.short} that suits your needs.
        </li>
        <li className="text-gray-300">
          <span className="font-bold text-white">Access from Any Device</span> – Goodie.ai works across desktop and mobile devices, so you can chat with your {term.name} whenever it's convenient for you.
        </li>
      </ul>

      <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-12">
        Our platform ensures a smooth experience whether you're chatting on the go or relaxing at home.
      </p>

      {/* Safe Environment Section */}
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
        A Safe Environment for an Encrypted {term.nameCapitalized} Chat
      </h3>

      <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
        At Goodie.ai, user safety and privacy are our top priorities. We use SSL encryption to ensure that all conversations remain private and secure. Your 
        interactions with your {term.name} are not shared or stored beyond your own access, keeping your experience confidential and safe.
      </p>
    </div>
  )
}

export default ExperienceSection

