import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './contexts/SidebarContext'
import LandingPage from './pages/Landing'
import { Toaster } from 'sonner'
import CollectionPage from './pages/Collection'
import GenerateImagePage from './pages/GenerateImage'

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/generate" element={<GenerateImagePage />} />
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
