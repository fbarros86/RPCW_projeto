"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/shadcn/resizable"
import { Button } from "./ui/shadcn/button"
import WorldMap from "./ui/pick-country/world-map"
import SearchAutocomplete from "./ui/pick-country/search-autocomplete"
import { useState } from "react"
import CursorAnimation from "./ui/misc/cursor-animation"
import AllGuesses from "./all-guesses"
import { CountryData } from "./all-guesses"

export function SearchCountry() {
  const [selectedName, setSelectedName] = useState("")
  const [countryData, setCountryData] = useState<CountryData | null>(null)

  const handleSelect = (name: string) => {
    setSelectedName(name)
    console.log("Selected name:", name)
  }

  const handleButtonClick = async () => {
    if (!selectedName) return

    try {
      const res = await fetch(`/api/country?country=${selectedName}`)
      const data: CountryData = await res.json()
      console.log("Fetched country data:", data)
      setCountryData(data)
    } catch (error) {
      console.error("Error fetching country data:", error)
    }
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="min-h-[30rem]">
        <ResizablePanel defaultSize={75} minSize={40} maxSize={80}>
          <div className="flex h-full items-center justify-center p-6">
            <WorldMap onCountrySelect={setSelectedName} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="z-0" />
        <ResizablePanel defaultSize={25} minSize={20} maxSize={60}>
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6">
            <div className="w-full max-w-full">
              <SearchAutocomplete onSelect={handleSelect} />
            </div>
            <CursorAnimation
              source="search_animation"
              classes="relative flex w-full flex-col items-center"
            >
              <Button
                className="h-[5rem] max-h-[5rem] w-[80%] max-w-[100%] text-wrap text-[100%] font-bold text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={handleButtonClick}
              >
                {selectedName === "" ? "Take a guess!" : selectedName}
              </Button>
            </CursorAnimation>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {countryData && <AllGuesses countryData={countryData} />}
    </>
  )
}
