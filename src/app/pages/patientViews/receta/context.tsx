import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../services/useRequest'
import {Receta, ContentContextType} from './models/models'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey, dataUser} = useAuthHeaders()
  const [data, setData] = useState<Receta[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const endPoint = 'recetas'
  const fetchSintomas = async () => {
    const result = await fetchData<Receta[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/recetas?idPersona=eq.${dataUser?.id}`,
      method: 'GET',
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

  const value: ContentContextType = {
    data,
    loading,
  }

  useEffect(() => {
    fetchSintomas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
