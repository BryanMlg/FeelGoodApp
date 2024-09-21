// models/models.ts
export interface ParametrosSaludGeneral {
  id?: number;
  peso?: string; // Agregado
  altura?: string; // Agregado
  pruebasHormonales?: string; // Agregado
  nivelesColesterol?: string; // Agregado
  glucosaSangre?: string; // Agregado
  estado: number
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
  show?: boolean
  data: ParametrosSaludGeneral[] | null
  loading: boolean
  createUpdate: (data: any, estado?: number) => Promise<void>
  selectedItem: any
  selectedItemPrincipal: any
  setSelectedItem: React.Dispatch<React.SetStateAction<ParametrosSaludGeneral[] | null>>
  opcion?: number
  setOpcion?: React.Dispatch<React.SetStateAction<number>> 
  Status: (id: number, estado: number) => Promise<void>
  editar?: boolean
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
}
