import LandingPage from './pages/Landing'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <LandingPage />
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
    </>
  )
}

export default App
