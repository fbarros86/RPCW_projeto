"use client"

import React from "react"
import Tile from "./tile"

const GuessCard = ({ country }: { country: string }) => {
  return (
    <div className="flex h-[20%] w-[70%] min-w-[40em] flex-row justify-around rounded-[3em] bg-card py-1">
      <div className="flex w-[20%] flex-col content-center justify-center gap-4">
        <div className="custom-font content-center bg-clip-text text-center text-[200%] font-normal tracking-wider text-card-foreground drop-shadow-lg">
          {country}
        </div>
        <div className="content-center justify-center text-center">FLAG</div>
      </div>
      <div className="flex h-auto w-[70%] flex-shrink flex-row items-center justify-center gap-6 pt-5">
        <Tile type="population" hint="d">
          11.8 M
        </Tile>
        <Tile type="temperature" hint="u">
          17.6ºC
        </Tile>
        <Tile type="continent" hint="wrong">
          Europe
        </Tile>
        <Tile type="gdp" hint="d">
          123.5 M
        </Tile>
        <Tile type="coordinate" hint="ur">
          NE
        </Tile>
      </div>
    </div>
  )
}

export default GuessCard
