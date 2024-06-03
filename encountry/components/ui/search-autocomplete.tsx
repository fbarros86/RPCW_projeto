"use client"

import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import useClickOutside from "../../hooks/click-outside"
import SearchContent from "./search-content"
import { useDebounce } from "use-debounce"
import { searchQuery } from "../../hooks/encode"

const SearchAutocomplete = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [autocomplete, setAutocomplete] = useState([])
  const [searchParams, setSearchParams] = useState("")
  const [value] = useDebounce(searchParams, 1000)
  const isEmpty = !autocomplete || autocomplete.length === 0

  const collapes = () => {
    setIsExpanded(false)
    setSearchParams("")
    setAutocomplete([])
    setNoData(false)
  }
  const handleOutsideClick = () => {
    console.log("Clicked outside")
  }

  const ref = useClickOutside(handleOutsideClick)
  const expand = () => {
    setIsExpanded(true)
  }

  const fetchData = async () => {
    if (!searchParams || searchParams.trim() === "") return
    setLoading(true)
    try {
      const url = searchQuery(searchParams)
      const response = await fetch(url)

      if (response) {
        const dataResponse = await response.json()
        if (dataResponse.length === 0) {
          setNoData(true)
        } else {
          setNoData(false)
        }

        setAutocomplete(dataResponse)
      }
    } catch (error) {
      console.log("Something went wrong", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [value])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      ref={ref}
      className="relative mx-auto w-full max-w-[700px] shadow-xl sm:w-[500px]"
    >
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-600 transition-colors hover:text-black">
        <AiOutlineSearch />
      </button>
      <input
        type="text"
        placeholder="Find..."
        onFocus={expand}
        className="w-full rounded-md border px-12 py-2 text-lg outline-none"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <span className="block h-4 w-4 animate-spin rounded-full border-l-2 border-t-2 border-black"></span>
        </div>
      )}

      <div
        className={`absolute w-full overflow-y-scroll rounded-md bg-white shadow-md transition-all ${
          isExpanded ? "h-[20rem] opacity-100" : "h-0 opacity-0"
        }`}
      >
        {noData && (
          <h1 className="mt-6 text-center text-lg text-gray-400">
            Nothing found...
          </h1>
        )}
        {isEmpty && !noData && (
          <h1 className="text-lf mt-6 text-center text-gray-400">
            Start Searching...
          </h1>
        )}

        {!isEmpty && <SearchContent autocomplete={autocomplete} />}
      </div>
    </form>
  )
}
export default SearchAutocomplete
