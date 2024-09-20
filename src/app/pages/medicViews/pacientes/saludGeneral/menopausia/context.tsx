import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../../services/useRequest'
import {Sintoma, ContentContextType, labelSintomas} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
import {useAuthHeaders} from '../../../../../modules/utility/hooks/useAuthHeathers'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const {selectedItemPrincipal} = useContext(ContextPrincipal)
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Sintoma[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editar, setEditar] = useState<boolean>(false)
  const [labelSintomas, setLabelSintomas] = useState<labelSintomas[] | null>(null)
  const endPoint = 'parametrosPaciente'
  const fetchSintomas = async () => {
    const result = await fetchData<Sintoma[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rpc/obtener_nivel_menopausia_por_persona`,
      method: 'POST',
      body: {idpersona: selectedItemPrincipal?.id},
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
    console.log('selectedItemPrincipal', selectedItemPrincipal)
    try {
      const result = await fetchData<Sintoma>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          editar ? `?id=eq.${data?.id}` : ''
        }`,
        method: editar ? 'PATCH' : 'POST',
        body: editar
          ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
          : {...data, estado: estado || 1, idPersona: selectedItemPrincipal?.id, creadoPor: 1}, //Create
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
      await fetchSintomas()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<Sintoma>({
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
      await fetchSintomas()
      setLoading(false)
    }
  }

  const getSintomas = async () => {
    const result = await fetchData<any>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/nivelMenopausia?select=id,nombre`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setLabelSintomas(result?.data)
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
    labelSintomas,
  }

  useEffect(() => {
    fetchSintomas()
    getSintomas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
