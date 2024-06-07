import axios from "axios"
import { graphdbEndpoint } from "./endpoint"

export async function getAllCountries(): Promise<string[]> {
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT ?country_name WHERE{
        ?c a :Pais.
        ?c :nome ?country_name.
    }
  `

  try {
    const response = await axios.get(graphdbEndpoint, {
      params: { query: sparqlQuery },
      headers: { Accept: "application/sparql-results+json" },
    })

    const countries: string[] = []
    for (let binding of response.data.results.bindings) {
      countries.push(binding.country_name.value)
    }

    return countries
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
    return []
  }
}
