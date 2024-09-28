import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {Calendario, ContentContextType} from './models/models'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey, dataUser} = useAuthHeaders()
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Calendario[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedFecha, setSelectedFecha] = useState<any>(null)
  const endPoint = 'registroDiarioPaciente'
  const fetchCalendario = async () => {
    const result = await fetchData<Calendario[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*&idPersona=eq.${dataUser?.id}`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
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
      const result = await fetchData<Calendario>({
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

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(1, 'Proceso Realizado con Éxito', '')
        toggleModal(0)
      } else {
        showNotification(0, 'Error', result?.code || 'Código de error desconocido')
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while creating the department.'
      )
    } finally {
      await fetchCalendario()
      setLoading(false)
    }
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
    selectedFecha,
    setSelectedFecha,
  }

  useEffect(() => {
    fetchCalendario()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
