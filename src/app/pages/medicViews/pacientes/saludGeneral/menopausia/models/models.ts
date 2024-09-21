// models/models.ts
export interface Sintoma {
  nivel_menopausia_id: number,
  nombre_nivel_menopausia: string
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
  data: Sintoma[] | null
  loading: boolean
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  createUpdate: (data: any, estado?: number) => Promise<void>
  Status: (id: number, estado: number) => Promise<void>
  editar?: boolean
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItemPrincipal: any
  labelSintomas: labelSintomas[] | null
}
