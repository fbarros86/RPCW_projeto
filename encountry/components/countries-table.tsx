import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import GuessCard from "./ui/guess-card"

const CountriesTable = () => {
  const countriesData = [
    {
      Name: "Angola",
      Flag: "https://www.worldometers.info/img/flags/ao-flag.gif",
    },
    {
      Name: "Country B",
      Flag: "🇧🇪",
    },
    {
      Name: "Country C",
      Flag: "🇨🇦",
    },
    {
      Name: "Country D",
      Flag: "🇩🇰",
    },
    {
      Name: "Country E",
      Flag: "🇪🇸",
    },
    {
      Name: "Country F",
      Flag: "🇫🇷",
    },
    {
      Name: "Country G",
      Flag: "🇬🇷",
    },
    {
      Name: "Country H",
      Flag: "🇭🇺",
    },
    {
      Name: "Country I",
      Flag: "🇮🇹",
    },
    {
      Name: "Country J",
      Flag: "🇯🇵",
    },
  ]

  return (
    <Table className="px-10">
      <TableCaption>
        A list of all the countries in the United Nations.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead>Flag</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countriesData.map((country, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{country.Name}</TableCell>
            <TableCell>
              <img
                src={country.Flag}
                alt={`${country.Name} flag`}
                className="h-12 w-20 object-contain"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CountriesTable
