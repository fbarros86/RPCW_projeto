import axios from "axios"
import { graphdbEndpoint } from "./endpoint"

export async function getAllFlags() {
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT (SAMPLE(?name) AS ?country) ?flag WHERE{
        ?c a :Pais.
        ?c :nome ?name.
        ?c :flag ?flag
    } GROUP BY ?flag
    `

  try {
    await axios
      .get(graphdbEndpoint, {
        params: { query: sparqlQuery },
        headers: { Accept: "application/sparql-results+json" },
      })
      .then((response) => {
        const flags: { [key: string]: string } = {}
        for (let binding of response.data.results.bindings) {
          flags[binding.country.value] = binding.flag.value
        }
        return flags
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
