"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import WorldMap from "./world-map"
import SearchAutocomplete from "./ui/search-autocomplete"
import { useState } from "react"
import CursorAnimation from "./ui/cursor-animation"

export function SearchCountry() {
  const [selectedName, setSelectedName] = useState("")

  const handleSelect = (name: string) => {
    setSelectedName(name)
    console.log("Selected name:", name)
  }

  return (
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
            <Button className="h-[5rem] max-h-[5rem] w-[80%] max-w-[100%] text-wrap text-[100%] font-bold text-white">
              {selectedName === "" ? "Take a guess!" : selectedName}
            </Button>
          </CursorAnimation>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
