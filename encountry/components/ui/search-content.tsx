import React from "react"

interface Show {
  id: number
  name: string
  image?: {
    medium: string
  }
  rating: {
    average: number | null
  }
}

interface AutocompleteItem {
  show: Show
}

interface SearchContentProps {
  autocomplete: AutocompleteItem[]
}

const SearchContent: React.FC<SearchContentProps> = ({ autocomplete }) => {
  return (
    <div className="py-2">
      <ul>
        {autocomplete.map((data) => {
          const { show } = data
          return (
            <li
              key={show.id}
              className="flex cursor-pointer items-center justify-between px-5 py-2 text-gray-600 transition duration-500 hover:bg-gray-200"
            >
              <div className="flex items-center gap-8">
                <img
                  src={show.image?.medium}
                  alt={show?.name}
                  className="w-[3rem]"
                />
                <h2 className="text-lg">{show?.name}</h2>
              </div>
              <h2>{show.rating.average || "N/A"}</h2>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchContent
