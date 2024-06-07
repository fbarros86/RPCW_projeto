import { NextResponse } from "next/server"
import { getAllCountries } from "../utils/get-all-countries"
import { getCountryInfo } from "../utils/get-country-info"

export async function GET() {
  try {
    // Get all country names
    const countries = (await getAllCountries()) as string[]

    if (!countries || countries.length === 0) {
      return NextResponse.json({ error: "No countries found" }, { status: 404 })
    }

    // Pick a random country
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)]

    // Get detailed information about the selected country
    const countryInfo = await getCountryInfo(randomCountry)

    if (!countryInfo) {
      return NextResponse.json(
        { error: "Failed to get country info" },
        { status: 500 },
      )
    }

    // Return the detailed information as JSON
    return NextResponse.json(countryInfo)
  } catch (error: any) {
    console.error("Error:", error.message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
