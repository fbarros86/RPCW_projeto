import axios from "axios"
import { graphdbEndpoint } from "./endpoint"
import { CountryData } from "@/components/all-guesses"

export async function editCountry(country: CountryData) {
  let triplos = ""
  let triposapagar = ""
  const countryName =
    typeof country.nome === "string"
      ? country.nome.replace(" ", "_")
      : country.nome[0].replace(" ", "_")

  for (const [key, value] of Object.entries(country)) {
    triplos += `:${countryName} :${key} "${value}" .\n`
    triposapagar += `:${countryName} :${key} ?o .\n`
  }
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    DELETE{
        ${triposapagar}
    }
    INSERT{
        ${triplos}
    }WHERE {
        :${countryName} ?p ?o .
    }
    `
  try {
    await axios
      .post(graphdbEndpoint + "/statements", sparqlQuery, {
        headers: {
          "Content-Type": "application/sparql-update",
          Accept: "application/sparql-results+json",
        },
      })
      .then((response) => {
        console.log(response.status)
        return response
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
