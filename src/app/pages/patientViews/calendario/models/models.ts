// models/models.ts
export interface Calendario {
  fecha: string
  horasSueno: string
  actividadFisica: string
  horasActividadFisica: string
  consumeAlcohol: string
  consumeTabaco: string
  idPersona: number
  creadoPor: number
  estado: number 
  id?: number
}


export interface ContentContextType {
  toggleModal: (data?: number) => void
  show: boolean
  data: Calendario[] | null
  error: string | null
  loading: boolean
  selectedItem: any
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>
  opcion: number
  setOpcion: React.Dispatch<React.SetStateAction<number>> 
  createUpdate: (data: any, estado?: number) => Promise<void>
  setSelectedFecha: React.Dispatch<React.SetStateAction<any>>
  selectedFecha: any
}
