export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
}

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}

export default API_CONFIG

