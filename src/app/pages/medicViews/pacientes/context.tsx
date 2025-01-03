import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../services/alertServices'
import {Persona, ContentContextType} from './models/models'

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey, dataUser} = useAuthHeaders()
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Persona[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const endPoint = 'persona'
  const fetchPersonas = async () => {
    const result = await fetchData<Persona[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rpc/obtener_personas_por_medico`,
      method: 'POST',
      body: {medicoid: dataUser?.id},
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setData(result.data)
    setLoading(result.loading)
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
        showNotification(
          4,
          'Error',
          result?.code || 'Código de error desconocido',
          undefined,
          'bottom-end'
        )
      }
      setLoading(result.loading)
    } finally {
      await fetchPersonas()
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
    Status,
  }

  useEffect(() => {
    fetchPersonas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
