// models/models.ts
export interface Enfermedad {
  id: number
  nombre: string
  estado: number
}

export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Enfermedad[] | null
  loading: boolean
  createUpdate: (nombre: string, id?: number, estado?: number) => Promise<void>
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<Enfermedad[] | null>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  Status: (id: number, estado: number) => Promise<void>
}
