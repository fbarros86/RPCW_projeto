import React from "react"

interface Show {
  id: number
  name: string
  image?: {
    medium: string
  }
}

interface AutocompleteItem {
  show: Show
}

interface SearchContentProps {
  autocomplete: AutocompleteItem[]
  handleSelect: (name: string) => void
}

const SearchContent: React.FC<SearchContentProps> = ({
  autocomplete,
  handleSelect,
}) => {
  return (
    <div className="py-2">
      <ul>
        {autocomplete.map((data) => {
          const { show } = data
          return (
            <li
              key={show.id}
              className="flex cursor-pointer items-center justify-between px-5 py-2 text-muted-foreground transition duration-500 hover:bg-input hover:text-muted-foreground"
              onClick={() => handleSelect(show.name)}
            >
              <div className="flex items-center gap-8">
                <img
                  src={show.image?.medium}
                  alt={show?.name}
                  className="w-[3rem]"
                />
                <h2 className="text-lg">{show?.name}</h2>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchContent
