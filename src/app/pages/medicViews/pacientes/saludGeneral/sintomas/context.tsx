import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../../services/useRequest'
import {Sintoma, ContentContextType} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
import {useAuthHeaders} from '../../../../../modules/utility/hooks/useAuthHeathers'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const {selectedItemPrincipal} = useContext(ContextPrincipal)
  const [data, setData] = useState<Sintoma[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const fetchSintomas = async () => {
    const result = await fetchData<Sintoma[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rpc/obtener_sintomas_por_personas`,
      method: 'POST',
      body: {idpersona: selectedItemPrincipal?.id},
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })
    setData(result.data)
    setLoading(result.loading)
  }

  const value: ContentContextType = {
    data,
    loading,
    selectedItemPrincipal,
  }

  useEffect(() => {
    fetchSintomas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
