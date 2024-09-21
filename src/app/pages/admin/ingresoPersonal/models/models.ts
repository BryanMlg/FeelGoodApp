// models/models.ts
export interface Persona {
  id: number
  nombre: string
  estado: number
  departamentoId: string | number
  municipioId: string | number
  rol: string
  primerNombres: string
  segundoNombre?: string
  tercerNombre?: string
  primerApellido: string
  segundoApellido: string
  dpi: string
  edad: string
  email: string
  fechaNacimiento: Date | null
}

export interface labelDepartamento {
  id: number
  nombre: string
}

export interface labelMunicipio {
  id: number
  nombre: string
}

export interface labelRol {
  id: number
  nombre: string
}


export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Persona[] | null
  loading: boolean
  createUpdate: (data: any, estado?: number) => Promise<void>
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<Persona[] | null>>
  opcion: number 
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  Status: (id: number, estado: number) => Promise<void>
  labelDepartamento: labelDepartamento[] | null
  labelMunicipio: labelMunicipio[] | null
  labelRol: labelRol[] | null
  search: number | null
  setSearch: React.Dispatch<React.SetStateAction<number | null>> 
  getMunicipios: (idDepartamento: number | string) => Promise<void>;
}
