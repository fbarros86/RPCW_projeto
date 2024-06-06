import React from "react"
import TileIcon from "./tile-icon"

export interface TileProps {
  children?: string
  hint?: "r" | "l" | "u" | "d" | "ul" | "ur" | "dl" | "dr" | "right" | "wrong"
  type:
    | "nome"
    | "continente"
    | "area"
    | "capital"
    | "densidade_populacional"
    | "espetativa_de_vida"
    | "exportacoes"
    | "gdp"
    | "hemisferio"
    | "importacoes"
    | "lado_em_que_conduz"
    | "latitude"
    | "literacia"
    | "longitude"
    | "migracao_liquida"
    | "moeda"
    | "mortalidade_infantil"
    | "populacao"
    | "taxa_de_mortalidade"
    | "taxa_de_natalidade"
    | "telefones_por_1000"
    | "costa"
    | "temperatura_media"
    | "racio_sexos"
    | "taxa_desemprego"
    | "taxa_fertilidade"
    | "medicos_por_mil"
    | "receita_imposto"
    | "emissoes_co2"
}

const Tile = ({ children = "", type, hint }: TileProps) => {
  const base =
    "aspect-square min-h-[30%] min-w-[30%] max-h-[80%] max-w-[80%] h-[60%] w-[60%] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative content-center rounded-lg"
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
      <TileIcon type={type} />
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
