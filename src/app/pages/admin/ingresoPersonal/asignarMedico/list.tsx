import {useContext} from 'react'
import {TableList} from '../../../../../_metronic/partials/widgets'
import {Medico} from './models/models'
import {ContentContext} from './context'
import Formulario from './form'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {allData, Status} = useContext(ContentContext)

  const handleStatus = (item: any) => {
    Status(item?.id, item?.estado)
  }

  // Filtrar si ya existe algún registro con estado 1
  // const hasActiveRecord = allData?.some((item: Medico) => item.estado === 1)

  const columns: ColumnConfig<Medico>[] = [
    {header: 'Nombre', accessor: 'medico_nombre', width: '125px'},
    {
      header: 'Estado',
      accessor: (item: Medico) => (
        <span
          className={`badge ${
            item.estado === 1 ? 'badge-light-success' : 'badge-light-danger'
          } fs-7 fw-bold`}
        >
          {item.estado === 1 ? 'Activo' : 'Desactivado'}
        </span>
      ),
    },
  ]

  return (
    <>
      {/* Mostrar el formulario solo si no existe un registro activo */}
      {/* {!hasActiveRecord && <Formulario />} */}
      <Formulario />
      <TableList
        className='mb-5 mb-xl-6'
        data={allData ?? []}
        columns={columns}
        onEstatus={handleStatus}
        showEditButton={false}
      />
    </>
  )
}
