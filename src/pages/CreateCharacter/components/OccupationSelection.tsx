interface OccupationOption {
  value: string
  label: string
}

interface OccupationSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const OccupationSelection = ({ selected, onSelect }: OccupationSelectionProps) => {
  const occupations: OccupationOption[] = [
    { value: 'massage_therapist', label: 'Massage Therapist' },
    { value: 'dentist', label: 'Dentist' },
    { value: 'nutritionist', label: 'Nutritionist' },
    { value: 'personal_trainer', label: 'Personal Trainer' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'barber', label: 'Barber' },
    { value: 'gynecologist', label: 'Gynecologist' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'librarian', label: 'Librarian' },
    { value: 'executive_assistant', label: 'Executive Assistant' },
    { value: 'interior_designer', label: 'Interior Designer' },
    { value: 'fashion_designer', label: 'Fashion Designer' },
    { value: 'architect', label: 'Architect' },
    { value: 'chef', label: 'Chef' },
    { value: 'product_designer', label: 'Product Designer' },
    { value: 'yoga_instructor', label: 'Yoga Instructor' },
    { value: 'flight_attendant', label: 'Flight Attendant' },
    { value: 'martial_arts_instructor', label: 'Martial Arts Instructor' },
    { value: 'commercial_pilot', label: 'Commercial Pilot' },
    { value: 'taxi_driver', label: 'Taxi Driver' },
    { value: 'firefighter', label: 'Firefighter' },
    { value: 'professor', label: 'Professor' },
    { value: 'dancer', label: 'Dancer' },
    { value: 'detective', label: 'Detective' },
    { value: 'soldier', label: 'Soldier/Military Personnel' },
    { value: 'singer_musician', label: 'Singer/Musician' },
    { value: 'photographer', label: 'Photographer' },
    { value: 'artist', label: 'Artist' },
    { value: 'scientist', label: 'Scientist' },
    { value: 'writer', label: 'Writer' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'construction_worker', label: 'Construction Worker' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'truck_driver', label: 'Truck Driver' },
    { value: 'software_developer', label: 'Software Developer' },
    { value: 'journalist', label: 'Journalist' }
  ]

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-white text-xl font-semibold mb-6 text-center">
        Choose Occupation<span className="text-pink-500">*</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {occupations.map((occupation) => (
          <button
            key={occupation.value}
            onClick={() => onSelect(occupation.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selected === occupation.value
                ? 'bg-pink-500 text-white'
                : 'bg-[#363b4a] text-white hover:bg-[#4a5063]'
            }`}
          >
            {occupation.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OccupationSelection
