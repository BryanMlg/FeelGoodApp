// models/models.ts
export interface Medico {
  idmedico: number
  medico_nombre: string
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
  allData: Medico[] | null
  error: string | null
  loading: boolean
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  asignarMedico: (data: any, estado?: number) => Promise<void>
  Status: (id: number, estado: number) => Promise<void>
  editar?: boolean
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItemPrincipal: any
  labelMedicos: labelMedicos[] | null
}
