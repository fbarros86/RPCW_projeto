import AllGuesses from "@/components/all-guesses"
import Header from "@/components/header"
import { SearchCountry } from "@/components/search-country"
import { CountryData } from "@/components/all-guesses"
import { useState } from "react"


export default function Home() {
  return (
    <>
      <Header />
      <SearchCountry />
    </>
  )
}
