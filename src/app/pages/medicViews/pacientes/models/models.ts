// models/models.ts
export interface Persona {
  persona_id: number
  persona_nombre: string
  estado: number
  departamentoid: string | number
  municipioid: string | number
  dpi: string
  edad: number
  email: string
  fecha_nacimiento: Date | null
  departamento_nombre: string
  municipio_nombre: string
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
  error: string | null
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

  getMunicipios: (idDepartamento: number | string) => Promise<void>
}
