import React from "react"
import { SearchCountry } from "./ui/pick-country/search-country"
import { CountryData } from "./ui/guess-card/all-guesses"
import { TileProps } from "./ui/guess-card/tile"

export interface GameProps {
  targetCountry: CountryData | null
  error: string | null
  gameHints: TileProps["type"][]
}

const Game = ({ targetCountry, error, gameHints }: GameProps) => {
  if (error) {
    return (
      <div className="flex min-h-[30rem] content-center justify-center text-center text-2xl font-bold">
        {error}
      </div>
    )
  }

  if (!targetCountry) {
    return (
      <div className="text-md flex min-h-[30rem] flex-col content-center items-center justify-center text-center text-muted-foreground">
        <span className="border-l-3 block h-10 w-10 animate-spin rounded-full border-b-2 border-muted-foreground text-2xl"></span>
      </div>
    )
  }

  return (
    <>
      <div className="mb-5 text-center text-2xl font-bold">
        Target country: {targetCountry.nome[0]}
      </div>
      <SearchCountry targetCountry={targetCountry} gameHints={gameHints} />
    </>
  )
}

export default Game
