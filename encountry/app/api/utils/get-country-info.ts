import axios from "axios"

const graphdbEndpoint = "http://localhost:7200/repositories/paises"

export async function getCountryInfo(country: string) {
  const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT ?verbo ?cena WHERE {
      ?country :nome "${country}".
      ?country a :Pais.
      ?country ?verbo ?cena MINUS {?country a ?cena}
    }
  `

  try {
    const response = await axios.get(graphdbEndpoint, {
      params: { query: sparqlQuery },
      headers: { Accept: "application/sparql-results+json" },
    })

    const countryInfo: { [key: string]: any } = {}
    for (let binding of response.data.results.bindings) {
      const verboURI = binding.verbo.value.split("/")
      const verbo = verboURI[verboURI.length - 1]
      if (verbo === "nome") {
        if (!(verbo in countryInfo)) {
          countryInfo[verbo] = []
        }
        countryInfo[verbo].push(binding.cena.value)
      } else {
        countryInfo[verbo] = binding.cena.value
      }
    }
    return countryInfo
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
