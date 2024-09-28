import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../services/useRequest'
import {Sintoma, ContentContextType, labelSintomas} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
import {useAuthHeaders} from '../../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey, dataUser} = useAuthHeaders()
  const {selectedItem: selectedItemPrincipal} = useContext(ContextPrincipal)
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Sintoma[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editar, setEditar] = useState<boolean>(false)
  const [labelSintomas, setLabelSintomas] = useState<labelSintomas[] | null>(null)
  const endPoint = 'sintomasPaciente'
  const fetchSintomas = async () => {
    const result = await fetchData<Sintoma[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rpc/obtener_sintomas_por_registro`,
      method: 'POST',
      body: {idregistro: selectedItemPrincipal?.id},
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setData(result.data)
    setLoading(result.loading)
  }

  const createUpdate = async (data?: any, estado?: number) => {
    console.log('')
    try {
      const result = await fetchData<Sintoma>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          editar ? `?id=eq.${data?.id}` : ''
        }`,
        method: editar ? 'PATCH' : 'POST',
        body: editar
          ? {...data, actualizadoPor: 1, actualizado: new Date()} //Update
          : {
              ...data,
              estado: estado || 1,
              idPersona: dataUser?.id,
              creadoPor: 1,
              idRegistro: selectedItemPrincipal?.id,
            }, //Create
        headers: {
          Authorization: Authorization,
          apikey: apikey,
        },
      })

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(3, 'Proceso Realizado con Éxito', '', undefined, 'top')
      } else {
        showNotification(4, 'Error', result?.code || 'Código de error desconocido')
      }
      setLoading(result.loading)
    } catch (err) {
    } finally {
      await fetchSintomas()
    }
  }

  const Status = async (id?: number, estado?: number) => {
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

      if (result.status && result.status >= 200 && result.status < 300) {
        showNotification(3, 'Proceso Realizado con Éxito', '', undefined, 'top')
      } else {
        showNotification(4, 'Error', result?.code || 'Código de error desconocido')
      }
      setLoading(result.loading)
    } catch (err) {
    } finally {
      await fetchSintomas()
    }
  }

  const getSintomas = async () => {
    const result = await fetchData<any>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/sintomas?select=id,nombre&estado=eq.1`,
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
