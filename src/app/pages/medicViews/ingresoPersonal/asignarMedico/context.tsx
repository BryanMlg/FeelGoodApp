import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../services/useRequest'
import {Medico, ContentContextType, labelMedicos} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {selectedItem: selectedItemPrincipal} = useContext(ContextPrincipal)
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Medico[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editar, setEditar] = useState<boolean>(false)
  const [labelMedicos, setLabelMedicos] = useState<labelMedicos[] | null>(null)
  const endPoint = 'medicoPaciente'
  const fetchMedicos = async () => {
    const result = await fetchData<Medico[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })

    setData(result.data)
    setError(result.error)
    setLoading(result.loading)
  }

  const createUpdate = async (data?: any, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<Medico>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${editar ? `?id=eq.${data?.id}` : ''}`,
        method: editar ? 'PATCH' : 'POST',
        body: editar
          ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
          : {...data, estado: estado || 1, idPersona: selectedItemPrincipal?.id, creadoPor: 1}, //Create
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        },
      })

      if (result.error) {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while creating the department.'
      )
    } finally {
      await fetchMedicos()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<Medico>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${`?id=eq.${id}`}`,
        method: 'PATCH',
        body: {estado: estado === 1 ? 0 : 1},
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        },
      })

      if (result.error) {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while creating the department.'
      )
    } finally {
      await fetchMedicos()
      setLoading(false)
    }
  }

  const getMedicos = async () => {
    const result = await fetchData<any>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/persona?select=id,rolId,primerNombres,primerApellido&&rolId=eq.3`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })

    setLabelMedicos(result?.data)
  }

  const toggleModal = (opcion?: number) => {
    setOpcion(opcion ?? 0)
    if (opcion === 0) {
      setSelectedItem(null)
    }
    setShow((prevShow) => !prevShow)
  }

  const value: ContentContextType = {
    toggleModal,
    show,
    data,
    error,
    loading,
    selectedItem,
    setSelectedItem,
    opcion,
    setOpcion,
    createUpdate,
    Status,
    setEditar,
    editar,
    selectedItemPrincipal,
    labelMedicos,
  }

  useEffect(() => {
    fetchMedicos()
    getMedicos()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
