import { createContext, useContext, useState, type ReactNode } from 'react'

type TabType = 'guys' | 'girls' | 'anime'

interface LandingTabContextType {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

const LandingTabContext = createContext<LandingTabContextType | undefined>(undefined)

export const LandingTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('girls')

  return (
    <LandingTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </LandingTabContext.Provider>
  )
}

export const useLandingTab = () => {
  const context = useContext(LandingTabContext)
  if (!context) {
    throw new Error('useLandingTab must be used within LandingTabProvider')
  }
  return context
}

