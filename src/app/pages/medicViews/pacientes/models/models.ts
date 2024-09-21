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
  loading: boolean
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<Persona[] | null>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>>
  Status: (id: number, estado: number) => Promise<void>
}
