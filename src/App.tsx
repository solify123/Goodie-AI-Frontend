import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './contexts/SidebarContext'
import LandingPage from './pages/Landing'
import { Toaster } from 'sonner'
import CollectionPage from './pages/Collection'
import GenerateImagePage from './pages/GenerateImage'
import ChatPage from './pages/Chat'
import CreateCharacterPage from './pages/CreateCharacter'

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/generate" element={<GenerateImagePage />} />
          <Route path="/create-character" element={<CreateCharacterPage />} />
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
    </SidebarProvider>
  )
}
export default App
