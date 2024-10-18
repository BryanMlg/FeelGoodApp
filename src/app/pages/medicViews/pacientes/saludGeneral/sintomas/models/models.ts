// models/models.ts
export interface Sintoma {
  sintoma_id: number
  sintoma_nombre: string
  descripcion: string
  estado: number
  fecha_creacion: Date
}

export interface ContentContextType {
  data: Sintoma[] | null
  loading: boolean
  selectedItemPrincipal: any
}
