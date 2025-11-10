import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Heart,
  MessageCircle,
  Flame
} from 'lucide-react'

interface RelationshipOption {
  value: string
  label: string
  icon: React.ReactNode
}

interface RelationshipSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

export const relationships: RelationshipOption[] = [
  {
    value: 'stranger',
    label: 'Stranger',
    icon: <div className="flex items-center justify-center space-x-1">
      <div className="w-5 h-3 bg-orange-500 rounded-sm"></div>
      <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
    </div>
  },
  {
    value: 'schoolmate',
    label: 'Schoolmate',
    icon: <GraduationCap className="w-8 h-8 text-blue-400" />
  },
  {
    value: 'work_colleague',
    label: 'Work Colleague',
    icon: <Briefcase className="w-8 h-8 text-amber-700" />
  },
  {
    value: 'mentor',
    label: 'Mentor',
    icon: <div className="relative flex items-center justify-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-3 h-3 bg-blue-500 rotate-45"></div>
      <BookOpen className="w-8 h-8 text-blue-400" />
    </div>
  },
  {
    value: 'boyfriend',
    label: 'Boyfriend',
    icon: <Heart className="w-8 h-8 fill-red-500 stroke-red-500" />
  },
  {
    value: 'sex_friend',
    label: 'Sex Friend',
    icon: <div className="flex items-center space-x-1">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#60A5FA" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="6" fill="#F472B6" />
      </svg>
    </div>
  },
  {
    value: 'husband',
    label: 'Husband',
    icon: <div className="relative w-10 h-10">
      <Heart className="absolute top-1 left-0 w-7 h-7 fill-[#009688] stroke-[#009688]" />
      <Heart className="absolute top-2 right-0 w-7 h-7 fill-yellow-400 stroke-yellow-400" />
    </div>
  },
  {
    value: 'lover',
    label: 'Lover',
    icon: <div className="relative w-10 h-10">
      <Heart className="absolute top-1 left-0 w-7 h-7 fill-[#009688] stroke-[#009688]" />
      <Heart className="absolute top-2 right-0 w-7 h-7 fill-yellow-400 stroke-yellow-400" />
    </div>
  },
  {
    value: 'friend',
    label: 'Friend',
    icon: <div className="flex items-center justify-center">
      <div className="text-3xl">👏</div>
    </div>
  },
  {
    value: 'best_friend',
    label: 'Best Friend',
    icon: <div className="flex items-center justify-center">
      <div className="text-3xl">🤝</div>
    </div>
  },
  {
    value: 'step_brother',
    label: 'Step Brother',
    icon: <MessageCircle className="w-8 h-8 text-red-500" />
  },
  {
    value: 'step_father',
    label: 'Step Father',
    icon: <Flame className="w-8 h-8 fill-yellow-500 text-red-500" />
  }
]

const RelationshipSelection = ({ selected, onSelect }: RelationshipSelectionProps) => {


  return (
    <div className="flex flex-col items-center">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Choose Relationship<span className="text-[#009688]">*</span>
      </h3>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl">
        {relationships.map((relationship) => (
          <button
            key={relationship.value}
            onClick={() => onSelect(relationship.value)}
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex flex-col items-center justify-center gap-1 sm:gap-2 rounded-lg transition-all duration-300 cursor-pointer ${selected === relationship.value
              ? 'ring-3 ring-[#009688]/50 text-white'
              : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
              }`}
          >
            <div className="text-white flex items-center justify-center">
              {relationship.icon}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-center px-1">{relationship.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RelationshipSelection

