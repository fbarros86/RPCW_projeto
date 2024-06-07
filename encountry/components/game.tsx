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
      <div className="flex flex-col min-h-[30rem] content-center items-center justify-center text-center text-md text-muted-foreground">
        <span className="block h-10 w-10 animate-spin rounded-full border-l-3 border-b-2 border-muted-foreground"></span>
        <div className="py-5">Loading, please wait :)</div>
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
