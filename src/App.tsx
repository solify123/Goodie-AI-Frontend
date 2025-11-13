import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './contexts/GlobalContext'
import LandingPage from './pages/Landing'
import DiscoverPage from './pages/Discover'
import { Toaster } from 'sonner'
import CollectionPage from './pages/Collection'
import GenerateImagePage from './pages/GenerateImage'
import ChatPage from './pages/Chat'
import CreateCharacterPage from './pages/CreateCharacter'
import MyAIPage from './pages/MyAI'
import ProfilePage from './pages/auth/profile'
import SubscriptionsPage from './pages/subscriptions'
import PrivateRoute from './components/private/PrivateRoute'

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/collection" element={<PrivateRoute><CollectionPage /></PrivateRoute>} />
          <Route path="/generate" element={<PrivateRoute><GenerateImagePage /></PrivateRoute>} />
          <Route path="/create-character" element={<PrivateRoute><CreateCharacterPage /></PrivateRoute>} />
          <Route path="/my-ai" element={<PrivateRoute><MyAIPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/subscriptions" element={<PrivateRoute><SubscriptionsPage /></PrivateRoute>} />
        </Routes>
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #374151',
              color: '#fff',
            },
            className: 'sonner-toast',
          }}
        />
      </Router>
    </GlobalProvider>
  )
}

export default App
