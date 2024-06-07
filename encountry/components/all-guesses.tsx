import React from "react"
import GuessCard from "./ui/guess-card/guess-card"
import { TileProps } from "./ui/guess-card/tile"

export interface CountryData {
  area: string
  capital: string
  continente: string
  costa: string
  densidade_populacional: string
  emissoes_co2: string
  espetativa_de_vida: string
  exportacoes: string
  flag: string
  gdp: string
  hemisferio: string
  importacoes: string
  lado_em_que_conduz: string
  latitude: string
  literacia: string
  longitude: string
  medicos_por_mil: string
  migracao_liquida: string
  moeda: string
  mortalidade_infantil: string
  nome: string[]
  populacao: string
  racio_sexos: string
  receita_imposto: string
  taxa_de_mortalidade: string
  taxa_de_natalidade: string
  taxa_desemprego: string
  taxa_fertilidade: string
  telefones_por_1000: string
  temperatura_media: string
}

const AllGuesses: React.FC<{ countryDataList: CountryData[] }> = ({
  countryDataList,
}) => {
  const types: TileProps["type"][] = [
    "area",
    "hemisferio",
    "populacao",
    "temperatura_media",
    "continente",
  ]

  if (countryDataList.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-5 py-10">
        No country data available.
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      {countryDataList.reverse().map((countryData, index) => (
        <GuessCard
          key={index}
          country={countryData.nome[0]}
          types={types}
          data={countryData}
        />
      ))}
    </div>
  )
}

export default AllGuesses

/*
const types1: TileProps["type"][] = [
    "area",
    "capital",
    "densidade_populacional",
    "espetativa_de_vida",
    "exportacoes",
  ]
  const types2: TileProps["type"][] = [
    "gdp",
    "hemisferio",
    "importacoes",
    "lado_em_que_conduz",
    "latitude",
  ]
  const types3: TileProps["type"][] = [
    "literacia",
    "longitude",
    "migracao_liquida",
    "moeda",
    "mortalidade_infantil",
  ]
  const types4: TileProps["type"][] = [
    "populacao",
    "taxa_de_mortalidade",
    "taxa_de_natalidade",
    "telefones_por_1000",
    "costa",
  ]
  const types5: TileProps["type"][] = [
    "temperatura_media",
    "racio_sexos",
    "taxa_desemprego",
    "taxa_fertilidade",
    "medicos_por_mil",
  ]
  const types6: TileProps["type"][] = [
    "receita_imposto",
    "emissoes_co2",
    "capital",
    "continente",
    "area",
  ]
*/
