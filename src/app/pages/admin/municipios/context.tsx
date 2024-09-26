import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {Municipio, ContentContextType, labelDepartamento} from './models/models'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showNotification} from '../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Municipio[] | null>(null)
  const [labelDepartamento, setLabelDepartamento] = useState<labelDepartamento[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const endPoint = 'municipio'
  const fetchDepartments = async () => {
    const result = await fetchData<Municipio[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setData(result.data)
    setLoading(result.loading)
  }

  const createUpdate = async (
    departamentoId?: number,
    nombre?: string,
    id?: number,
    estado?: number
  ) => {
    try {
      const result = await fetchData<Municipio>({
        url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
          opcion === 1 ? `?id=eq.${id}` : ''
        }`,
        method: opcion === 1 ? 'PATCH' : 'POST',
        body:
          opcion === 1
            ? {nombre, actualizadoPor: 1, actualizado: new Date()} //Update
            : {departamentoId: departamentoId, nombre, estado: estado || 1, creadoPor: 1}, //Create
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
    } catch (err) {
    } finally {
      await fetchDepartments()
    }
  }

  const Status = async (id?: number, estado?: number) => {
    try {
      const result = await fetchData<Municipio>({
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
    } catch (err) {
    } finally {
      await fetchDepartments()
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
  }

  useEffect(() => {
    fetchDepartments()
    getDepartamentos()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
