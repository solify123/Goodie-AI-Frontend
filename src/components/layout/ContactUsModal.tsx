import { X } from 'lucide-react'
import { useState } from 'react'

interface ContactUsModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactUsModal = ({ isOpen, onClose }: ContactUsModalProps) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    // Handle send message logic here
    console.log('Message sent:', message)
    setMessage('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-3">Contact us</h2>
            <p className="text-white text-sm leading-relaxed">
              Write your message here or email us at{' '}
              <span className="text-pink-500">support@goodie.ai</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors ml-4 flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Description"
            className="w-full h-32 bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-3 rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactUsModal
