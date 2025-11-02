interface ClothingOption {
  value: string
  label: string
}

interface ClothingSelectionProps {
  selected: string
  onSelect: (value: string) => void
}

const ClothingSelection = ({ selected, onSelect }: ClothingSelectionProps) => {
  const clothingOptions: ClothingOption[] = [
    // Clothing Combinations/Styles
    { value: 'suit_and_shirt', label: 'Suit And Shirt' },
    { value: 'jeans_and_tshirt', label: 'Jeans And T-Shirt' },
    { value: 'chinos_and_shirt', label: 'Chinos And Shirt' },
    { value: 'bermuda_and_polo', label: 'Bermuda And Polo' },
    { value: 'pants_and_sweater', label: 'Pants And Sweater' },
    { value: 'tracksuit', label: 'Tracksuit' },
    { value: 'blazer_and_tshirt', label: 'Blazer And T-Shirt' },
    { value: 'leather_vest_and_jeans', label: 'Leather Vest And Jeans' },
    { value: 'hoodie_and_cargo', label: 'Hoodie And Cargo' },
    { value: 'denim_and_khakis', label: 'Denim And Khakis' },
    { value: 'cardigan_and_shirt', label: 'Cardigan And Shirt' },
    { value: 'peacoat_and_turtleneck', label: 'Peacoat And Turtleneck' },
    { value: 'vest_and_long_sleeve', label: 'Vest And Long Sleeve' },
    { value: 'shorts_and_henley', label: 'Shorts And Henley' },
    { value: 'trench_and_collared_shirt', label: 'Trench And Collared Shirt' },
    { value: 'jacket_and_chinos', label: 'Jacket And Chinos' },
    { value: 'polo_and_linen_pants', label: 'Polo And Linen Pants' },
    { value: 'shirt_and_corduroy_pants', label: 'Shirt And Corduroy Pants' },
    { value: 'henley_and_shorts', label: 'Henley And Shorts' },
    { value: 'linen_shirt_and_pants', label: 'Linen Shirt And Pants' },
    { value: 'rugby_shirt_and_joggers', label: 'Rugby Shirt And Joggers' },
    { value: 'sweater_and_jeans', label: 'Sweater And Jeans' },
    { value: 'tee_and_leather_pants', label: 'Tee And Leather Pants' },
    { value: 'turtleneck_and_trousers', label: 'Turtleneck And Trousers' },
    { value: 'vest_and_sweatpants', label: 'Vest And Sweatpants' },
    { value: 'suit_and_tie', label: 'Suit And Tie' },
    { value: 'tuxedo', label: 'Tuxedo' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'swim_shorts', label: 'Swim Shorts' },
    { value: 'boxer_shorts', label: 'Boxer Shorts' },
    { value: 'martial_arts_black_belt', label: 'Martial Arts Black Belt' },
    
    // Occupations/Roles/Themes
    { value: 'f1_driver', label: 'F1 Driver' },
    { value: 'military', label: 'Military' },
    { value: 'firefighter', label: 'Firefighter' },
    { value: 'police', label: 'Police' },
    { value: 'scientist', label: 'Scientist' },
    { value: 'cowboy', label: 'Cowboy' },
    { value: 'builder', label: 'Builder' },
    { value: 'biker', label: 'Biker' },
    { value: 'pilot', label: 'Pilot' },
    { value: 'waiter', label: 'Waiter' },
    { value: 'barista', label: 'Barista' },
    { value: 'chef', label: 'Chef' },
    { value: 'business', label: 'Business' },
    { value: 'ninja', label: 'Ninja' },
    { value: 'knight', label: 'Knight' },
    { value: 'ski', label: 'Ski' },
    { value: 'superhero', label: 'Superhero' },
    { value: 'steampunk', label: 'Steampunk' },
    { value: 'astronaut', label: 'Astronaut' },
    { value: 'hip_hop', label: 'Hip-Hop' },
    { value: 'gothic', label: 'Gothic' },
    { value: 'pirate', label: 'Pirate' },
    { value: 'scottish', label: 'Scottish' },
    { value: 'prince', label: 'Prince' },
    { value: 'monk', label: 'Monk' },
    { value: 'prisoner', label: 'Prisoner' },
    { value: 'tribal', label: 'Tribal' },
    { value: 'santa', label: 'Santa' },
    { value: 'rugby', label: 'Rugby' },
    { value: 'golfer', label: 'Golfer' },
    { value: 'surfer', label: 'Surfer' },
    { value: 'lumberjack', label: 'Lumberjack' },
    { value: 'samurai', label: 'Samurai' }
  ]

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
        Choose Clothing<span className="text-pink-500">*</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl">
        {clothingOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-all duration-300 text-xs sm:text-sm cursor-pointer ${
              selected === option.value
                ? 'bg-pink-500 text-white border-pink-500'
                : 'text-white outline-2 outline-white/20 hover:outline-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ClothingSelection
