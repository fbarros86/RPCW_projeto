import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import WorldMap from "./world-map"
import SearchAutocomplete from "./ui/search-autocomplete"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[30rem] rounded-lg"
    >
      <ResizablePanel defaultSize={75} minSize={40} maxSize={80}>
        <div className="flex h-full items-center justify-center p-6">
          <WorldMap />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="z-0" />
      <ResizablePanel defaultSize={25} minSize={20} maxSize={60}>
        <div className="flex h-full space-x-2 p-6">
          <SearchAutocomplete />
          <Button>Search</Button>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
