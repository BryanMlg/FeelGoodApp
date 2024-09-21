import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../../services/useRequest'
import {Receta, ContentContextType} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
import {useAuthHeaders} from '../../../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const {selectedItemPrincipal} = useContext(ContextPrincipal)
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Receta[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editar, setEditar] = useState<boolean>(false)
  const endPoint = 'recetas'
  const fetchSintomas = async () => {
    const result = await fetchData<Receta[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/recetas?idPersona=eq.${selectedItemPrincipal?.id}`,
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
    console.log('selectedItemPrincipal', selectedItemPrincipal)
    try {
      const result = await fetchData<Receta>({
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

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(3, 'Proceso Realizado con Éxito', '', undefined, 'top')
      } else {
        showNotification(
          4,
          'Error',
          result?.code || 'Código de error desconocido',
          undefined,
          'top'
        )
      }
      setLoading(result.loading)
    } catch (err) {
    } finally {
      await fetchSintomas()
    }
  }

  const Status = async (id?: number, estado?: number) => {
    try {
      const result = await fetchData<Receta>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${`?id=eq.${id}`}`,
        method: 'PATCH',
        body: {estado: estado === 1 ? 0 : 1},
        headers: {
          Authorization: Authorization,
          apikey: apikey,
        },
      })

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(3, 'Proceso Realizado con Éxito', '', undefined, 'top')
      } else {
        showNotification(
          4,
          'Error',
          result?.code || 'Código de error desconocido',
          undefined,
          'top'
        )
      }
      setLoading(result.loading)
    } catch (err) {
    } finally {
      await fetchSintomas()
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
  }

  useEffect(() => {
    fetchSintomas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
