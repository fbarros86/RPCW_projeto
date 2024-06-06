import React from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/shadcn/drawer"
import { Button } from "../shadcn/button"
import * as HoverCard from "@radix-ui/react-hover-card"
import { getIcon } from "./guess-icons"
import { TileProps } from "./tile"
import styles from "./hovercard.module.css"

interface TileIconProps {
  type: TileProps["type"]
}

const TileIcon = ({ type }: TileIconProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <div className="relative flex w-full cursor-pointer justify-center pb-5 drop-shadow-lg">
              {getIcon(type)}
            </div>
          </HoverCard.Trigger>

          <HoverCard.Portal>
            <HoverCard.Content
              side={"top"}
              sideOffset={5}
              className={`${styles.HoverCardContent} rounded-lg bg-card-foreground`}
            >
              <div className="w-auto h-auto p-3 content-center text-center font-medium text-background">
                {type}
              </div>
              <HoverCard.Arrow className="fill-foreground" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{type}</DrawerTitle>
          <DrawerDescription>LIXO :)</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TileIcon
