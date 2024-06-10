import { useEffect, useState } from "react"
import { Button } from "@/components/ui/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog"
import { Input } from "@/components/ui/shadcn/input"
import { Label } from "@/components/ui/shadcn/label"
import { CountryData } from "@/app/api/utils/get-country-info"
import { useParams } from "next/navigation"
import { keyMappings } from "./ui/guess-card/tile-icon"
import SearchAutocomplete from "./ui/pick-country/search-autocomplete"

interface CountryDialogProps {
  action: "Add" | "Edit" | "Remove"
  countryData?: CountryData | null
  countryName?: string | null
}

export const CountryDialog = ({
  action,
  countryData,
  countryName,
}: CountryDialogProps) => {
  const initialData: CountryData = {
    area: "",
    capital: "",
    continente: "",
    costa: "",
    densidade_populacional: "",
    emissoes_co2: "",
    espetativa_de_vida: "",
    exportacoes: "",
    flag: "",
    gdp: "",
    hemisferio: "",
    importacoes: "",
    lado_em_que_conduz: "",
    latitude: "",
    literacia: "",
    longitude: "",
    medicos_por_mil: "",
    migracao_liquida: "",
    moeda: "",
    mortalidade_infantil: "",
    nome: [""],
    populacao: "",
    racio_sexos: "",
    receita_imposto: "",
    taxa_de_mortalidade: "",
    taxa_de_natalidade: "",
    taxa_desemprego: "",
    taxa_fertilidade: "",
    telefones_por_1000: "",
    temperatura_media: "",
    ...countryData,
  }

  const [formData, setFormData] = useState(initialData)
  const [countryDataEdit, setCountryData] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { country } = useParams()
  const [selectedName, setSelectedName] = useState("") // for edit

  const handleSelect = (name: string) => {
    setSelectedName(name)
    console.log("Selected name:", name)
  }


  useEffect(() => {
    if (!countryName) return

    const fetchCountryData = async () => {
      try {
        const response = await fetch(`/api/country?country=${countryName}`)
        if (!response.ok) {
          throw new Error("Failed to fetch country information")
        }
        const data: CountryData = await response.json()
        setCountryData(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountryData()
  }, [country])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id as keyof CountryData]: value,
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={action === "Remove" ? "destructive" : "default"}>
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`max-h-[80%] w-[70rem] overflow-hidden ${action === "Remove" ? "sm:max-w-[625px]" : "sm:max-w-[625px]"} `}
      >
        <DialogHeader className="sticky left-0 right-0 top-0 z-10 bg-opacity-20">
          <DialogTitle>{action} Country</DialogTitle>
          <DialogDescription>
            {action === "Remove"
              ? "Are you sure you want to remove this country?"
              : `Please ${action.toLowerCase()} the country details.`}
          </DialogDescription>
        </DialogHeader>
        <div
          className={`mtb-10 ${action === "Remove" ? "h-[15vh]" : "h-[50vh]"} overflow-y-auto scrollbar scrollbar-track-card scrollbar-thumb-muted scrollbar-thumb-rounded-full hover:cursor-pointer hover:scrollbar-thumb-border active:scrollbar-thumb-primary dark:hover:scrollbar-thumb-zinc-700`}
        >
          <div className={`grid gap-4 py-4`}>
            {action === "Remove" ? (
              <div className="mx-4 grid grid-cols-4 items-center gap-6">
                <Label htmlFor="name" className="text-right">
                  Country Name
                </Label>
                <SearchAutocomplete onSelect={handleSelect} />
              </div>
            ) : (
              Object.keys(initialData).map((key) => (
                <div
                  key={key}
                  className="mx-4 grid grid-cols-4 items-center gap-6"
                >
                  <Label htmlFor={key} className="text-right">
                    {keyMappings[key]}
                  </Label>
                  <Input
                    id={key}
                    // value={formData[key]}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 left-0 right-0 z-10">
          <Button type="submit" onClick={handleSubmit}>
            {action === "Remove" ? "Confirm" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
