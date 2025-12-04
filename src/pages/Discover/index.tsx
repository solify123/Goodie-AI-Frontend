import Layout from '../../components/layout'
import CharacterDiscoverCard from './components/character'
import characters from '../../config/girls.json' with { type: 'json' }

interface Character {
  name: string
  age: string
  description: string
  defaultImage: string
  hoverImage: string
}

const DiscoverPage = () => {
  return (
    <Layout>
      <div className="mt-5 pb-5">
        <div className="flex flex-col gap-4 md:max-w-4xl mx-auto">
          {(characters as Character[]).map((character: Character, index: number) => (
            <CharacterDiscoverCard key={character.name || index} character={character} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default DiscoverPage

