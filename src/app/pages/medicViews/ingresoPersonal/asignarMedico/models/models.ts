// models/models.ts
export interface Medico {
  idMedico: number,
  estado: number
}

export interface labelMedicos {
  id: number
  primerNombres: string
  rolId: number
  primerApellido: string
}


export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Medico[] | null
  error: string | null
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
  labelMedicos: labelMedicos[] | null
}
