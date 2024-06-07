const rows_facil = [
  "continente",
  "hemisferio",
  "latitude",
  "longitude",
  "temperatura_media",
]
const rows_medio = [
  "gdp",
  "area",
  "densidade_populacional",
  "lado_em_que_conduz",
  "populacao",
]
const rows_dificil = [
  "taxa_desemprego",
  "taxa_fertilidade",
  "racio_sexos",
  "emissoes_co2",
  "telefones_por_1000",
  "taxa_de_natalidade",
  "taxa_de_mortalidade",
  "costa",
  "espetativa_de_vida",
  "exportacoes",
  "importacoes",
  "literacia",
  "migracao_liquida",
  "mortalidade_infantil",
]

export function getRandomColumns() {
  // get 3 from rows_facil 1 from the others
  var columns = []
  var random = Math.floor(Math.random() * 4)
  var random2 = Math.floor(Math.random() * 4)
  if (random2 == random) {
    random2 = (random2 + 1) % 5
  }
  var random3 = Math.floor(Math.random() * 4)
  while (random3 == random || random3 == random2) {
    random3 = (random3 + 1) % 5
  }
  var random4 = Math.floor(Math.random() * 4)
  var random5 = Math.floor(Math.random() * (rows_dificil.length - 1))

  columns.push(rows_facil[random])
  columns.push(rows_facil[random2])
  columns.push(rows_facil[random3])
  columns.push(rows_medio[random4])
  columns.push(rows_dificil[random5])
  return columns
}
