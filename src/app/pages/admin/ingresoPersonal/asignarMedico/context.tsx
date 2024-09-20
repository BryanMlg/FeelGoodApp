import React, {createContext, useState, useEffect, useContext} from 'react'
import {fetchData} from '../../../../services/useRequest'
import {Medico, ContentContextType, labelMedicos} from './models/models'
import {ContentContext as ContextPrincipal} from '../context'
import {useAuthHeaders} from '../../../../modules/utility/hooks/useAuthHeathers'
import {showErrorAlert, showSuccessAlert} from '../../../../services/alertServices'
export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const {Authorization, apikey} = useAuthHeaders()
  const {selectedItem: selectedItemPrincipal} = useContext(ContextPrincipal)
  const [show, setShow] = useState<boolean>(false)
  const [opcion, setOpcion] = useState<number>(0)
  const [allData, setAllData] = useState<Medico[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [editar, setEditar] = useState<boolean>(false)
  const [labelMedicos, setLabelMedicos] = useState<labelMedicos[] | null>(null)
  const endPoint = 'medicoPaciente'
  const fetchMedicos = async () => {
    const result = await fetchData<Medico[]>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/rpc/obtener_medico_paciente_por_persona`,
      method: 'POST',
      body: {idpersona: selectedItemPrincipal?.id},
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setAllData(result.data)
    setError(result.error)
    setLoading(result.loading)
  }

  const asignarMedico = async (data?: any, estado?: number) => {
    const medicoExistente = allData?.find(
      (medico: Medico) => medico.idmedico.toString() === data?.idMedico.toString()
    )

    if (medicoExistente) {
      showErrorAlert('Ya se asigno este medico.', `${medicoExistente?.medico_nombre}`)
    } else {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchData<Medico>({
          url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/${endPoint}${
            editar ? `?id=eq.${data?.id}` : ''
          }`,
          method: editar ? 'PATCH' : 'POST',
          body: editar
            ? {...data, actualizadoPor: 1, actualizado: new Date()} // Update
            : {...data, estado: estado || 1, idPersona: selectedItemPrincipal?.id, creadoPor: 1}, // Create
          headers: {
            Authorization: Authorization,
            apikey: apikey,
          },
        })

        if (result.status !== null && result.status >= 200 && result.status < 300) {
          showSuccessAlert('Proceso Realizado con Éxito', '')
          toggleModal(0)
        } else {
          showErrorAlert('Error', '')
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An error occurred while creating the department.'
        )
      } finally {
        await fetchMedicos()
        setLoading(false)
      }
    }
  }

  const Status = async (id?: number, estado?: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData<Medico>({
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
      await fetchMedicos()
      setLoading(false)
    }
  }

  const getMedicos = async () => {
    const result = await fetchData<any>({
      url: `https://vfjrliqltrpedrplukmk.supabase.co/rest/v1/persona?select=id,rolId,primerNombres,primerApellido&&rolId=eq.3`,
      method: 'GET',
      headers: {
        Authorization: Authorization,
        apikey: apikey,
      },
    })

    setLabelMedicos(result?.data)
  }

  const toggleModal = (opcion?: number) => {
    setOpcion(opcion ?? 0)

    setShow((prevShow) => !prevShow)
  }

  const value: ContentContextType = {
    toggleModal,
    show,
    allData,
    error,
    loading,
    opcion,
    setOpcion,
    asignarMedico,
    Status,
    setEditar,
    editar,
    selectedItemPrincipal,
    labelMedicos,
  }

  useEffect(() => {
    fetchMedicos()
    getMedicos()
  }, [])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
