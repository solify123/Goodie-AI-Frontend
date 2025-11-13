import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './contexts/SidebarContext'
import { LandingTabProvider } from './contexts/LandingTabContext'
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
import AuthCallbackPage from './pages/auth/callback'
import { CreateCharacterGenderProvider } from './contexts/CreateCharacterGenderContext'

function App() {
  return (
    <GlobalProvider>
      <SidebarProvider>
        <LandingTabProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/generate" element={<GenerateImagePage />} />
              <Route
                path="/create-character"
                element={
                  <CreateCharacterGenderProvider>
                    <CreateCharacterPage />
                  </CreateCharacterGenderProvider>
                }
              />
              <Route path="/my-ai" element={<MyAIPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
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
        </LandingTabProvider>
      </SidebarProvider>
    </GlobalProvider>
  )
}

export default App
