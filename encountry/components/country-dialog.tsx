import { useState } from "react"
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

interface CountryDialogProps {
  action: "Add" | "Edit" | "Remove"
  countryData?: CountryData | null
}

export const CountryDialog = ({ action, countryData }: CountryDialogProps) => {
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action} Country</DialogTitle>
          <DialogDescription>
            {action === "Remove"
              ? "Are you sure you want to remove this country?"
              : `Please ${action.toLowerCase()} the country details.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {action === "Remove" ? (
            <>
              <Label htmlFor="name" className="text-right">
                Country Name
              </Label>
              <Input
                id="nome"
                defaultValue={formData.nome}
                readOnly
                className="col-span-3"
              />
            </>
          ) : (
            Object.keys(initialData).map((key) => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={key} className="text-right">
                  {key}
                </Label>
                <Input
                  id={key}
                  //value={formData[key]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {action === "Remove" ? "Confirm" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
