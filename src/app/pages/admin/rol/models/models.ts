// models/models.ts
export interface Rol {
  id: number
  nombre: string
  estado: number
}

export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Rol[] | null
  loading: boolean
  createUpdate: (nombre: string, id?: number, estado?: number) => Promise<void>
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<Rol[] | null>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  Status: (id: number, estado: number) => Promise<void>
}
