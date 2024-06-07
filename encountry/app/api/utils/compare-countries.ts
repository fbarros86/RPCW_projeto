import axios from "axios"

import { graphdbEndpoint } from "./endpoint"

export async function compareCountries(
  country1: string,
  country2: string,
  row: string,
) {
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT ?valor1 ?valor2 WHERE{
        ?country2 :nome "${country2}".
        ?country1 :${row} ?valor1.
        ?country2 :${row} ?valor2.
        ?country1 :nome "${country1}".
    }   
  `

  try {
    await axios
      .get(graphdbEndpoint, {
        params: { query: sparqlQuery },
        headers: { Accept: "application/sparql-results+json" },
      })
      .then((response) => {
        var v1 = response.data.results.bindings[0].valor1.value.replace(
          ",",
          ".",
        )
        var v2 = response.data.results.bindings[0].valor2.value.replace(
          ",",
          ".",
        )

        if (
          row == "hemisferio" ||
          row == "lado_em_que_conduz" ||
          row == "moeda" ||
          row == "continente"
        ) {
          return v1 == v2 ? "right" : "wrong"
        } else {
          v1 = v1.replace("$", "")
          v1 = v1.replace("%", "")
          v2 = v2.replace("$", "")
          v2 = v2.replace("%", "")
          v1 = parseFloat(v1)
          v2 = parseFloat(v2)
          return v1 < v2 ? "d" : v1 > v2 ? "u" : "right"
        }
      })
  } catch (error: any) {
    console.error("Error making SPARQL query:", error.message)
    if (error.response) {
      console.error("Response data:", error.response.data)
      console.error("Response status:", error.response.status)
      console.error("Response headers:", error.response.headers)
    } else if (error.request) {
      console.error("No response received:", error.request)
    } else {
      console.error("Error message:", error.message)
    }
    return null
  }
}
