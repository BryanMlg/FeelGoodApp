// models/models.ts
export interface Municipio {
  id: number
  departamendoId: number
  nombre: string
  estado: number
}

export interface labelDepartamento {
  id: number
  nombre: string
}

export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Municipio[] | null
  labelDepartamento: labelDepartamento[] | null
  loading: boolean
  createUpdate: (departamentoId: number, nombre: string, id?: number, estado?: number) => Promise<void>
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<Municipio[] | null>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>>
  Status: (id: number, estado: number) => Promise<void>
}
