import React from "react"
import GuessCard from "./ui/guess-card"

const AllGuesses = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <GuessCard country="PORTUGAL" />
      <GuessCard country="ROMANIA" />
      <GuessCard country="UNITED STATES OF AMERICA" />
    </div>
  )
}

export default AllGuesses
