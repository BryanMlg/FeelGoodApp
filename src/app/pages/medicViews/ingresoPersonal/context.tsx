import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {
  Persona,
  ContentContextType,
  labelDepartamento,
  labelMunicipio,
  labelRol,
} from './models/models'

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Persona[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [labelDepartamento, setLabelDepartamento] = useState<labelDepartamento[] | null>(null)
  const [labelMunicipio, setLabelMunicipio] = useState<labelMunicipio[] | null>(null)
  const [labelRol, setLabelRol] = useState<labelRol[] | null>(null)
  const [search, setSearch] = useState<number | null>(0)
  const endPoint = 'persona'
  const fetchPersonas = async () => {
    const result = await fetchData<Persona[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*${
        search && `&rolId=eq.${search}`
      }`,
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
      const result = await fetchData<Persona>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          opcion === 1 ? `?id=eq.${data?.id}` : ''
        }`,
        method: opcion === 1 ? 'PATCH' : 'POST',
        body:
          opcion === 1
            ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
            : {...data, estado: estado || 1}, //Create
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
      await fetchPersonas()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<Persona>({
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
      await fetchPersonas()
      setLoading(false)
    }
  }

  const getDepartamentos = async () => {
    const result = await fetchData<labelDepartamento[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/departamento?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })

    setLabelDepartamento(result?.data)
  }

  const getMunicipios = async () => {
    const result = await fetchData<labelMunicipio[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/municipio?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })

    setLabelMunicipio(result?.data)
  }

  const getRol = async () => {
    const result = await fetchData<labelRol[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rol?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })

    setLabelRol(result?.data)
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
    createUpdate,
    selectedItem,
    setSelectedItem,
    opcion,
    setOpcion,
    Status,
    labelDepartamento,
    labelMunicipio,
    labelRol,
    search,
    setSearch,
  }

  useEffect(() => {
    fetchPersonas()
    getDepartamentos()
    getMunicipios()
    getRol()
  }, [])

  useEffect(() => {
    fetchPersonas()
  }, [search])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
