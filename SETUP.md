# Goodie AI - Setup Guide

Complete setup guide for Goodie AI with Supabase authentication.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## 🔐 Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - Name: `goodie-ai`
   - Database Password: (save this securely)
   - Region: Choose closest to your users

### 2. Get API Credentials

1. Go to Project Settings > API
2. Copy the following:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

### 3. Configure Authentication

1. Go to Authentication > Settings
2. Enable **Email** provider
3. Configure email templates (optional)
4. Enable **OAuth providers** if needed:
   - **Google**: Add OAuth client ID and secret
   - **Discord**: Add OAuth client ID and secret  
   - **Twitter/X**: Add OAuth client ID and secret

### 4. Configure Email Settings

1. Go to Authentication > Email Templates
2. Customize confirmation email template
3. Update redirect URLs:
   - Confirmation: `http://localhost:5173/auth/callback`
   - Reset password: `http://localhost:5173/auth/reset-password`

### 5. Set Up Database (Optional)

Run this SQL in SQL Editor to create additional tables:

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Characters table
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  description TEXT,
  personality TEXT[],
  image_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view public characters
CREATE POLICY "Public characters are viewable by everyone"
  ON characters FOR SELECT
  USING (is_public = true);

-- Policy: Users can create their own characters
CREATE POLICY "Users can create characters"
  ON characters FOR INSERT
  WITH CHECK (auth.uid() = created_by);
```

## 🚀 Backend Setup

### 1. Install Dependencies

```bash
cd Goodie-AI-Backend
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` file:

```env
PORT=5000
NODE_ENV=development

# Supabase Configuration (from step 2 above)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Start Backend Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## 💻 Frontend Setup

### 1. Install Dependencies

```bash
cd Goodie-AI-Frontend
npm install
```

### 2. Create Environment File

Create `.env` file in frontend root:

```env
# Backend API
VITE_API_URL=http://localhost:5000/api

# Supabase Configuration (same as backend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Frontend Server

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## ✅ Testing Authentication

### 1. Register New User

1. Open `http://localhost:5173`
2. Click "Create Free Account"
3. Enter email and password
4. Click "Create Free Account"
5. Check your email for confirmation link

### 2. Confirm Email

1. Click confirmation link in email
2. You'll be redirected to the app
3. Your account is now confirmed

### 3. Login

1. Click "Login"
2. Enter your credentials
3. Click "Sign In"
4. You should be logged in

### 4. Test API

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get current user (use token from login response)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔧 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change PORT in .env file
PORT=5001
```

**Supabase connection error:**
- Verify your SUPABASE_URL and keys in `.env`
- Check Supabase project status
- Ensure network connection

### Frontend Issues

**API connection error:**
- Ensure backend is running on correct port
- Verify VITE_API_URL in `.env`
- Check browser console for CORS errors

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run build`

### Authentication Issues

**Email not received:**
- Check spam folder
- Verify email provider settings in Supabase
- Test with different email address

**OAuth not working:**
- Verify OAuth credentials in Supabase
- Check redirect URLs match exactly
- Enable OAuth provider in Supabase dashboard

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/resend-confirmation` - Resend confirmation email

### Health Check

- `GET /api/health` - Check API status

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT_SECRET** (at least 32 characters)
3. **Enable RLS** on all Supabase tables
4. **Use HTTPS** in production
5. **Rotate service_role key** regularly
6. **Implement rate limiting** for auth endpoints
7. **Enable 2FA** for admin accounts

## 🚀 Deployment

### Backend Deployment

Recommended platforms:
- Railway
- Render
- Heroku
- DigitalOcean

### Frontend Deployment

Recommended platforms:
- Vercel
- Netlify
- Cloudflare Pages

### Environment Variables

Remember to set all environment variables in your deployment platform!

## 📞 Support

For issues or questions:
- Check Supabase docs: https://supabase.com/docs
- Express.js docs: https://expressjs.com
- React docs: https://react.dev

---

**Last Updated:** 2025

