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
  data: Receta[] | null
  loading: boolean
}
