import React, {createContext, useState, useEffect} from 'react'
import {fetchData} from '../../../services/useRequest'
import {signUp} from '../../../modules/auth/redux/AuthCRUD'
import {useAuthHeaders} from '../../../modules/utility/hooks/useAuthHeathers'
import {showErrorAlert, showSuccessAlert} from '../../../services/alertServices'
import {
  Persona,
  ContentContextType,
  labelDepartamento,
  labelMunicipio,
  labelRol,
} from './models/models'

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey, dataUser} = useAuthHeaders()
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [data, setData] = useState<Persona[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [labelDepartamento, setLabelDepartamento] = useState<labelDepartamento[] | null>(null)
  const [labelMunicipio, setLabelMunicipio] = useState<labelMunicipio[] | null>(null)
  const [labelRol, setLabelRol] = useState<labelRol[] | null>(null)

  const endPoint = 'persona'
  const fetchPersonas = async () => {
    const result = await fetchData<Persona[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}?select=*&medicoPaciente!inner.idMedico=eq.${dataUser?.id}`,
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
      const result = await fetchData({
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
      opcion === 0 && signUp(data?.email, 'Predeterminada123')
      if (result.status !== null && result.status >= 200 && result.status < 300) {
        showSuccessAlert('Proceso Realizado con Éxito', '')
        toggleModal(0)
      } else {
        showErrorAlert('Error', '')
      }
    } finally {
      await fetchPersonas()
      setLoading(false)
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

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

      if (result.status !== null && result.status >= 200 && result.status < 300) {
        showSuccessAlert('Proceso Realizado con Éxito', '')
      } else {
        showErrorAlert('Error', '')
      }
    } finally {
      await fetchPersonas()

      setLoading(false)
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
    if (
      result.status !== null &&
      result.status >= 200 &&
      result.status < 300 &&
      opcion === 0 &&
      result?.data?.length
    ) {
      showSuccessAlert('Proceso Realizado con Éxito', '')
    } else if (idDepartamento && opcion === 0 && !result?.data?.length) {
      showErrorAlert('Error', `${!result?.data?.length && 'No Se Encontraron Municipios'}`, 5000)
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
    error,
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
    getMunicipios,
  }

  useEffect(() => {
    fetchPersonas()
    getDepartamentos()
    getRol()
  }, [])

  useEffect(() => {
    fetchPersonas()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
