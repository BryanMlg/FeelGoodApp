import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {signUp} from '../../../modules/auth/redux/AuthCRUD'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showErrorAlert, showSuccessAlert} from '../../../services/alertServices'
import {
  Persona,
  ContentContextType,
  labelDepartamento,
  labelMunicipio,
  labelRol,
} from './models/models'

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
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
      const result = await fetchData({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          opcion === 1 ? `?id=eq.${data?.id}` : ''
        }`,
        method: opcion === 1 ? 'PATCH' : 'POST',
        body:
          opcion === 1
            ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
            : {...data, estado: estado || 1}, //Create
        headers: {
          Authorization: Authorization,
          apikey: apikey,
        },
      })
      opcion === 0 && signUp(data?.email, 'Predeterminada123')
      if (result.status !== null && result.status >= 200 && result.status < 300) {
        showSuccessAlert('Proceso Realizado con Éxito', '')
        toggleModal(0)
      } else {
        showErrorAlert('Error', '')
      }
    } finally {
      await fetchPersonas()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData({
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

      if (result.status !== null && result.status >= 200 && result.status < 300) {
        showSuccessAlert('Proceso Realizado con Éxito', '')
      } else {
        showErrorAlert('Error', '')
      }
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

  const getMunicipios = async (idDepartamento: number | string) => {
    const result = await fetchData<labelMunicipio[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/municipio?departamentoId=eq.${idDepartamento}&select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmanJsaXFsdHJwZWRycGx1a21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODQ4MjEsImV4cCI6MjAzODU2MDgyMX0.LZto_niKIkJAaBvwl5u9_yed3vtc_F81C1Q_4193qIw',
      },
    })
    if (
      result.status !== null &&
      result.status >= 200 &&
      result.status < 300 &&
      opcion === 0 &&
      result?.data?.length
    ) {
      showSuccessAlert('Proceso Realizado con Éxito', '')
    } else if (idDepartamento && opcion === 0 && !result?.data?.length) {
      showErrorAlert('Error', `${!result?.data?.length && 'No Se Encontraron Municipios'}`, 5000)
    }
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
    getMunicipios,
  }

  useEffect(() => {
    fetchPersonas()
    getDepartamentos()
    getRol()
  }, [])

  useEffect(() => {
    fetchPersonas()
  }, [search])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
