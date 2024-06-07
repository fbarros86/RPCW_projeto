"use client"

import React, { useEffect, useState } from "react"
import Tile, { TileProps } from "./tile"
import { CountryData } from "./all-guesses"

interface GuessCardProps {
  selectedCountry: CountryData
  types: TileProps["type"][]
  targetCountry: CountryData
}

const GuessCard: React.FC<GuessCardProps> = ({
  selectedCountry,
  types,
  targetCountry,
}) => {
  const [hints, setHints] = useState<Record<string, TileProps["hint"]>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hintsData: Record<string, TileProps["hint"]> = {}
        for (const type of types) {
          console.log(
            "Comparing countries:",
            selectedCountry,
            targetCountry,
            type,
          )

          const response = await fetch(
            `/api/compare?country1=${selectedCountry.nome[0]}&country2=${targetCountry.nome[0]}&row=${type}`,
          )
          const data = await response.json()
          hintsData[type] = data.result
        }
        setHints(hintsData)
      } catch (error) {
        console.error("Error fetching hints:", error)
      }
    }

    fetchData()
  }, [selectedCountry, targetCountry, types])

  const countryName = selectedCountry.nome[0]
  const countryFlag = selectedCountry.flag

  return (
    <div className="flex h-[20%] w-[70%] min-w-[40em] flex-row justify-around rounded-[3em] bg-card py-1 transition delay-150 ease-in-out hover:bg-stone-200 dark:hover:bg-neutral-800">
      <div className="flex w-[20%] flex-col content-center justify-center gap-4">
        <div className="custom-font content-center bg-clip-text text-center text-[200%] font-normal tracking-wider text-card-foreground drop-shadow-lg">
          {countryName}
        </div>
        <div className="relative flex content-center justify-center rounded-md text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img
            src={countryFlag}
            alt={`${countryName} flag`}
            className="h-auto w-16 rounded-sm drop-shadow-lg"
          />
        </div>
      </div>
      <div className="flex h-auto w-[70%] flex-shrink flex-row items-center justify-center gap-6 pt-5">
        {types.map((type) => (
          <Tile
            key={type}
            type={type}
            hint={hints[type] === undefined ? "wrong" : hints[type]}
          >
            {type !== "nome" ? selectedCountry[type] : undefined}
          </Tile>
        ))}
      </div>
    </div>
  )
}

export default GuessCard
