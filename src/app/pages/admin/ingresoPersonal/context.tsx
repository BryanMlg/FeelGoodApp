import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {signUp} from '../../../modules/auth/redux/AuthCRUD'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showNotification, closeToast} from '../../../services/alertServices'
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
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [labelDepartamento, setLabelDepartamento] = useState<labelDepartamento[] | null>(null)
  const [labelMunicipio, setLabelMunicipio] = useState<labelMunicipio[] | null>(null)
  const [labelRol, setLabelRol] = useState<labelRol[] | null>(null)
  const [search, setSearch] = useState<number | null>(null)
  const endPoint = 'persona'
  const fetchPersonas = async () => {
    const result = await fetchData<Persona[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*${
        search && `&rolId=eq.${search}`
      }`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setData(result.data)
    setLoading(result.loading)
  }

  const createUpdate = async (data?: any, estado?: number) => {
    try {
      let userCreated = false

      // Si la opción es 0, crear el usuario primero
      if (opcion === 0) {
        userCreated = await signUp(data?.email, 'Predeterminada123') // Esperar a que el usuario sea creado
      }

      if (userCreated || opcion === 1) {
        // Continuar solo si el usuario fue creado correctamente
        const result = await fetchData({
          url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
            opcion === 1 ? `?id=eq.${data?.id}` : ''
          }`,
          method: opcion === 1 ? 'PATCH' : 'POST',
          body:
            opcion === 1
              ? {...data, actualizadoPor: 1, actualizado: new Date()} // Update
              : {...data, estado: estado || 1}, // Create
          headers: {
            Authorization: Authorization,
            apikey: apikey,
          },
        })

        if (result.status && result.status >= 200 && result.status < 300) {
          showNotification(1, 'Proceso Realizado con Éxito', '')
          toggleModal(0)
        } else {
          showNotification(0, 'Error', result?.code || 'Código de error desconocido')
        }
        setLoading(result.loading)
      }
    } catch (error) {
    } finally {
      await fetchPersonas()
    }
  }

  const Status = async (id?: number, estado?: number) => {
    try {
      const result = await fetchData({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${`?id=eq.${id}`}`,
        method: 'PATCH',
        body: {estado: estado === 1 ? 0 : 1},
        headers: {
          Authorization: Authorization,
          apikey: apikey,
        },
      })

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(3, 'Proceso Realizado con Éxito', '', undefined, 'bottom-end')
      } else {
        showNotification(4, 'Error', result?.code || 'Código de error desconocido')
      }
      setLoading(result.loading)
    } finally {
      await fetchPersonas()
    }
  }

  const getDepartamentos = async () => {
    const result = await fetchData<labelDepartamento[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/departamento?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setLabelDepartamento(result?.data)
  }

  const getMunicipios = async (idDepartamento: number | string) => {
    const result = await fetchData<labelMunicipio[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/municipio?departamentoId=eq.${idDepartamento}&select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })
    if (result.status && result.status >= 200 && result.status < 300 && result?.data?.length) {
      closeToast()
      showNotification(
        3,
        'Proceso Realizado con Éxito',
        'Se Encontraron Municipos',
        undefined,
        'top'
      )
    } else if (idDepartamento && !result?.data?.length) {
      closeToast()
      showNotification(
        4,
        'Error',
        `${!result?.data?.length && 'No Se Encontraron Municipios'}`,
        5000,
        'top'
      )
    }
    setLabelMunicipio(result?.data)
  }

  const getRol = async () => {
    const result = await fetchData<labelRol[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rol?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
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
