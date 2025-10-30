import { Phone, MoreVertical, Menu, Send, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const Conversation = () => {
  const [message, setMessage] = useState('')

  const messages = [
    {
      id: 1,
      type: 'ai',
      content: 'An image of a man from the chest down, wearing a white button-up shirt with rolled-up sleeves, white pants, and a black belt with a watch on his left wrist.',
      timestamp: '11:57PM',
      isImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'user',
      content: 'how old are you?',
      timestamp: '11:57PM'
    },
    {
      id: 3,
      type: 'ai',
      content: "*laughs softly* Oh, you're curious now huh? Well, let's just say I'm mature enough to know what I want...and young enough to enjoy every minute of it. 😉",
      timestamp: '11:58PM',
      hasAudio: true
    },
    {
      id: 4,
      type: 'user',
      content: 'what is your name?',
      timestamp: '11:58PM'
    },
    {
      id: 5,
      type: 'ai',
      content: "*chuckles* My name's Arthur Murphy, but most people call me Art. What should I call you, cutie?",
      timestamp: '11:58PM',
      hasAudio: true
    }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="Arthur"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-medium">Arthur</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-green-400 hover:bg-[#2a2a2a] rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-[#2a2a2a] rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-[#2a2a2a] rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#2a2a2a] text-white'
              }`}
            >
              {msg.isImage ? (
                <div className="space-y-2">
                  <img
                    src={msg.imageUrl}
                    alt="Character"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-300">{msg.content}</p>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">{msg.timestamp}</span>
                {msg.hasAudio && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                    <div className="w-1 h-2 bg-purple-500 rounded-full"></div>
                    <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                    <div className="w-1 h-2 bg-purple-500 rounded-full"></div>
                    <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
          />
          <button
            type="button"
            className="px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white hover:bg-[#3a3a3a] transition-colors flex items-center space-x-1"
          >
            <span className="text-sm">Ask</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Conversation
