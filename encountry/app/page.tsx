import AllGuesses from "@/components/all-guesses"
import Header from "@/components/header"
import { SearchCountry } from "@/components/search-country"

export default function Home() {
  return (
    <>
      <Header />
      <SearchCountry />
      <AllGuesses />
    </>
  )
}
