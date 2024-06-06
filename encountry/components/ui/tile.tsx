import React from "react"
import {
  LuPersonStanding,
  LuCloudSunRain,
  LuMountain,
  LuCoins,
  LuLocateFixed,
} from "react-icons/lu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./button"

interface TileProps {
  children?: string
  hint?: "r" | "l" | "u" | "d" | "ul" | "ur" | "dl" | "dr" | "right" | "wrong"
  type: "population" | "temperature" | "continent" | "gdp" | "coordinate"
}

const Tile = ({ children = "", type, hint }: TileProps) => {
  const base =
    "aspect-square min-h-[30%] min-w-[30%] max-h-[80%] max-w-[80%] h-[60%] w-[60%] hover:h-[63%] hover:w-[63%] hover:border-4 hover:border-indigo-500/100 relative content-center rounded-lg"
  const gradient1 = "from-red-500 via-yellow-500 to-primary"
  const gradient2 = "from-red-500 from-2% via-yellow-500 via-40% to-primary"

  const dirRight = `${base} bg-gradient-to-r ${gradient1}`
  const dirLeft = `${base} bg-gradient-to-l ${gradient1}`
  const dirUp = `${base} bg-gradient-to-t ${gradient1}`
  const dirDown = `${base} bg-gradient-to-b ${gradient1}`
  const dirUpLeft = `${base} bg-gradient-to-tl ${gradient2}`
  const dirUpRight = `${base} bg-gradient-to-tr ${gradient2}`
  const dirDownLeft = `${base} bg-gradient-to-bl ${gradient2}`
  const dirDownRight = `${base} bg-gradient-to-br ${gradient2}`
  const hintRight = `${base} bg-primary`
  const hintWrong = `${base} bg-red-500`

  var typeDesc = ""
  const getIcon = () => {
    const size = "30%"
    const color = "foreground"
    switch (type) {
      case "population":
        typeDesc = "This describes the population of this country in millions."
        return <LuPersonStanding size={size} color={color} />
      case "temperature":
        return <LuCloudSunRain size={size} color={color} />
      case "continent":
        return <LuMountain size={size} color={color} />
      case "gdp":
        return <LuCoins size={size} color={color} />
      case "coordinate":
        return <LuLocateFixed size={size} color={color} />
      default:
        return null
    }
  }

  const getTypeClass = () => {
    switch (hint) {
      case "r":
        return `${dirRight}`
      case "l":
        return `${dirLeft}`
      case "u":
        return `${dirUp}`
      case "d":
        return `${dirDown}`
      case "ul":
        return `${dirUpLeft}`
      case "ur":
        return `${dirUpRight}`
      case "dl":
        return `${dirDownLeft}`
      case "dr":
        return `${dirDownRight}`
      case "right":
        return `${hintRight}`
      case "wrong":
        return `${hintWrong}`
      default:
        return `bg-foreground`
    }
  }

  return (
    <div className="aspect-square">
      <Drawer>
        <DrawerTrigger>
          <div className="relative flex w-full cursor-pointer justify-center pb-5 drop-shadow-lg">
            {getIcon()}
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{type.toUpperCase()}</DrawerTitle>
            <DrawerDescription>{typeDesc}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div className="relative flex h-full w-full justify-center">
        <div className={getTypeClass()}>
          <div className="flex cursor-default justify-center text-[100%] font-extrabold text-white drop-shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tile
