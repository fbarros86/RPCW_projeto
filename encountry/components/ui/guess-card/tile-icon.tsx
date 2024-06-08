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

export const keyMappings: Record<string, string> = {
  nome: "Name",
  continente: "Continent",
  area: "Area",
  capital: "Capital",
  densidade_populacional: "Population Density",
  espetativa_de_vida: "Life Expectancy",
  exportacoes: "Exports",
  gdp: "GDP",
  hemisferio: "Hemisphere",
  importacoes: "Imports",
  lado_em_que_conduz: "Driving Side",
  latitude: "Latitude",
  literacia: "Literacy",
  longitude: "Longitude",
  migracao_liquida: "Net Migration",
  moeda: "Currency",
  mortalidade_infantil: "Infant Mortality",
  populacao: "Population",
  taxa_de_mortalidade: "Mortality Rate",
  taxa_de_natalidade: "Birth Rate",
  telefones_por_1000: "Phones per 1000",
  costa: "Coastline",
  temperatura_media: "Average Temperature",
  racio_sexos: "Sex Ratio",
  taxa_desemprego: "Unemployment Rate",
  taxa_fertilidade: "Fertility Rate",
  medicos_por_mil: "Physicians per 1000",
  receita_imposto: "Tax Revenue",
  emissoes_co2: "CO2 Emissions",
}

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
              <div className="h-auto w-auto content-center p-3 text-center font-medium text-background">
                {keyMappings[type]}
              </div>
              <HoverCard.Arrow className="fill-foreground" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{type}</DrawerTitle>
          <DrawerDescription>{type} description...</DrawerDescription>
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
