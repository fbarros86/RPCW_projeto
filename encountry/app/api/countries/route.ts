import { NextResponse } from "next/server"
import { getAllCountryUniqueNames } from "../utils/get-all-countries"
import { getCountryInfo, CountryData } from "../utils/get-country-info"

export async function GET() {
  try {
    // Get all country names
    const countries = await getAllCountryUniqueNames()

    if (!countries || countries.length === 0) {
      return NextResponse.json({ error: "No countries found" }, { status: 404 })
    }

    // Get detailed information about each country
    const countriesData = await Promise.all(
      countries.map(async (country) => {
        const countryInfo = await getCountryInfo(country)
        return countryInfo
      }),
    )

    // Filter out null values
    const filteredCountriesData = countriesData.filter(
      (country) => country !== null,
    ) as CountryData[]

    // Remove duplicates based on country name
    const uniqueCountriesData: CountryData[] = []

    filteredCountriesData.forEach((country) => {
      country.nome = [country.nome[0]]
      uniqueCountriesData.push(country)
    })

    // Return the detailed information as JSON
    return NextResponse.json(uniqueCountriesData)
  } catch (error: any) {
    console.error("Error:", error.message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
