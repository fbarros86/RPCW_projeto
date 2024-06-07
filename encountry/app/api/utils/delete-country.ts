import axios from "axios"
import { graphdbEndpoint } from "./endpoint"

export async function deleteCountry(country: string) {
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    DELETE{
       
        ?country ?a ?b
    }
    WHERE{
        ?country :nome "${country}".
        ?country ?a ?b
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
