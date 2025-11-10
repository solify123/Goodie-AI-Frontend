import { createContext, useContext, useState, type ReactNode } from 'react'

export type CreateCharacterGender = 'girls' | 'guys'

interface CreateCharacterGenderContextType {
  gender: CreateCharacterGender
  setGender: (gender: CreateCharacterGender) => void
}

const CreateCharacterGenderContext = createContext<CreateCharacterGenderContextType | null>(null)

export const CreateCharacterGenderProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGender] = useState<CreateCharacterGender>('guys')

  return (
    <CreateCharacterGenderContext.Provider value={{ gender, setGender }}>
      {children}
    </CreateCharacterGenderContext.Provider>
  )
}

export const useCreateCharacterGender = () => {
  const context = useContext(CreateCharacterGenderContext)
  if (!context) {
    throw new Error('useCreateCharacterGender must be used within CreateCharacterGenderProvider')
  }
  return context
}

export const useCreateCharacterGenderOptional = () => {
  return useContext(CreateCharacterGenderContext)
}

