"use client"

import React from "react"
import Tile, { TileProps } from "./tile"

interface GuessCardProps {
  country: string
  types: TileProps["type"][]
  data: { [key: string]: any }
}

const GuessCard: React.FC<GuessCardProps> = ({ country, types, data }) => {
  return (
    <div className="flex h-[20%] w-[70%] min-w-[40em] flex-row justify-around rounded-[3em] bg-card py-1 transition delay-150 ease-in-out hover:bg-stone-200 dark:hover:bg-neutral-800">
      <div className="flex w-[20%] flex-col content-center justify-center gap-4">
        <div className="custom-font content-center bg-clip-text text-center text-[200%] font-normal tracking-wider text-card-foreground drop-shadow-lg">
          {country}
        </div>
        <div className="relative flex content-center justify-center rounded-md text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img
            src={data.flag}
            alt={`${country} flag`}
            className="h-auto w-16 rounded-sm drop-shadow-lg"
          />
        </div>
      </div>
      <div className="flex h-auto w-[70%] flex-shrink flex-row items-center justify-center gap-6 pt-5">
        {types.map((type) => (
          <Tile key={type} type={type} hint="u">
            {data[type]}
          </Tile>
        ))}
      </div>
    </div>
  )
}

export default GuessCard
