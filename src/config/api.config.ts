export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  DEFAULT_MALE_IMAGE: "https://cdn.candy.ai/330509-658c2639-38fc-4af6-8ca2-a5b395b1f228-webp90",
  DEFAULT_FEMALE_IMAGE: "https://goodie-ai.vercel.app/images/girls/2/girl%20(12).png"
}

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}

export default API_CONFIG

export const BodyTypes = {
  "slim": "Slim",
  "muscular": "Muscular",
  "wide": "Wide"
}

export const Ethnicities = {
  "caucasian": "Caucasian",
  "latino": "Latino",
  "asian": "Asian",
  "arab": "Arab",
  "black-afro": "black-afro"
}

export const Relationships = {
  "stranger": "Stranger",
  "schoolmate": "Schoolmate",
  "work_colleague": "Work Colleague",
  "mentor": "Mentor",
  "boyfriend": "Boyfriend",
  "sex_friend": "Sex Friend",
  "husband": "Husband",
  "lover": "Lover",
  "friend": "Friend",
  "best_friend": "Best Friend",
  "step_brother": "Step Brother",
  "step_father": "Step Father"
}

export const Occupations = {
  "massage_therapist": "Massage Therapist",
  "dentist": "Dentist",
  "nutritionist": "Nutritionist",
  "personal_trainer": "Personal Trainer",
  "pharmacist": "Pharmacist",
  "barber": "Barber",
  "gynecologist": "Gynecologist",
  "doctor": "Doctor",
  "librarian": "Librarian",
  "executive_assistant": "Executive Assistant",
  "interior_designer": "Interior Designer",
  "fashion_designer": "Fashion Designer",
  "architect": "Architect",
  "chef": "Chef",
  "product_designer": "Product Designer",
  "yoga_instructor": "Yoga Instructor",
  "flight_attendant": "Flight Attendant",
  "martial_arts_instructor": "Martial Arts Instructor",
  "commercial_pilot": "Commercial Pilot",
  "taxi_driver": "Taxi Driver",
  "firefighter": "Firefighter",
  "professor": "Professor",
  "dancer": "Dancer",
  "detective": "Detective",
  "soldier": "Soldier/Military Personnel",
  "singer_musician": "Singer/Musician",
  "photographer": "Photographer",
  "artist": "Artist",
  "scientist": "Scientist",
  "writer": "Writer",
  "lawyer": "Lawyer",
  "construction_worker": "Construction Worker",
  "plumber": "Plumber",
  "mechanic": "Mechanic",
  "truck_driver": "Truck Driver",
  "software_developer": "Software Developer",
  "journalist": "Journalist"
}

export const Personnel = {
  "protector": "Protector",
  "sage": "Sage",
  "hero": "Hero",
  "jester": "Jester",
  "toy_boy": "Toy Boy",
  "dominant": "Dominant",
  "submissive": "Submissive",
  "lover": "Lover",
  "beast": "Beast",
  "confidant": "Confidant",
  "rebel": "Rebel",
  "scholar": "Scholar"
}