import { NextRequest, NextResponse } from "next/server"
import { getCountryInfo } from "../utils/get-country-info"

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country")

  if (!country) {
    return NextResponse.json(
      { error: "Country name is required" },
      { status: 400 },
    )
  }

  try {
    const countryInfo = await getCountryInfo(country)
    if (countryInfo) {
      return NextResponse.json(countryInfo, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Failed to fetch country information" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error fetching country information:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
