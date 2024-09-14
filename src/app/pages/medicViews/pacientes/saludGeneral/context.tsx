import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../services/useRequest'
import {ContentContext as ContextPrincipal} from '../context'
import {ParametrosSaludGeneral, ContentContextType} from './models/models'
import {useAuthHeaders} from '../../../../modules/utility/hooks/useAuthHeathers'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const {toggleModal, selectedItem: selectedItemPrincipal} = useContext(ContextPrincipal)
  const [data, setData] = useState<ParametrosSaludGeneral[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editar, setEditar] = useState<boolean>(false)
  const endPoint = 'saludGeneral'
  const fetchSaludGeneral = async () => {
    const result = await fetchData<ParametrosSaludGeneral[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?idPersona=eq.${selectedItemPrincipal?.id}&select=*`,
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
      const result = await fetchData<ParametrosSaludGeneral>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          editar ? `?id=eq.${data?.id}` : ''
        }`,
        method: editar ? 'PATCH' : 'POST',
        body: editar
          ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
          : {...data, estado: estado || 1}, //Create
        headers: {
          Authorization: Authorization,
          apikey: apikey,
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
      await fetchSaludGeneral()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<ParametrosSaludGeneral>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${`?id=eq.${id}`}`,
        method: 'PATCH',
        body: {estado: estado === 1 ? 0 : 1},
        headers: {
          Authorization: Authorization,
          apikey: apikey,
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
      await fetchSaludGeneral()
      setLoading(false)
    }
  }

  const value: ContentContextType = {
    toggleModal,
    data,
    error,
    loading,
    createUpdate,
    selectedItem,
    selectedItemPrincipal,
    Status,
    setSelectedItem,
    editar,
    setEditar,
  }

  useEffect(() => {
    fetchSaludGeneral()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
