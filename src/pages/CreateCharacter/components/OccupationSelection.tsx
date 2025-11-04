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
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Occupation<span className="text-[#009688]">*</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {occupations.map((occupation) => (
          <button
            key={occupation.value}
            onClick={() => onSelect(occupation.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              selected === occupation.value
                ? 'bg-[#009688] text-white'
                : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
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
