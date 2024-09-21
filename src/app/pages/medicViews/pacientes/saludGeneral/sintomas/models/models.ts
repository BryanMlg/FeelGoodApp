// models/models.ts
export interface Sintoma {
  sintoma_id: number,
  sintoma_nombre: string,
  descripcion: string
  estado: number
}




export interface ContentContextType {
  data: Sintoma[] | null
  loading: boolean
  selectedItemPrincipal: any
}
