// models/models.ts
export interface Receta {
  descripcion: string
  estado: number
  id: number
}

export interface labelSintomas {
  id: number
  nombre: string
}


export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Receta[] | null
  loading: boolean
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  Status: (id: number, estado: number) => Promise<void>
  editar?: boolean
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
}
