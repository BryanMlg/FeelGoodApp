import {useContext} from 'react'
import {TableList} from '../../../../../../_metronic/partials/widgets'
import {Sintoma} from './models/models'
import {ContentContext} from './context'
type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {data, Status, setSelectedItem, setEditar} = useContext(ContentContext)
  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setEditar(true)
  }
  const handleStatus = (item: any) => {
    Status(item?.id, item?.estado)
  }
  const columns: ColumnConfig<Sintoma>[] = [
    {header: 'Menopáusia', accessor: 'nombre_nivel_menopausia', width: '125px'},
    {
      header: 'Estado',
      accessor: (item: Sintoma) => (
        <span
          className={`badge ${
            item.estado === 1 ? 'badge-light-success' : 'badge-light-danger'
          } fs-7 fw-bold`}
        >
          {item.estado === 1 ? 'Activo' : 'Desactivado'}
        </span>
      ),
      width: '150px',
    },
  ]

  return (
    <>
      <TableList
        className='mb-5 mb-xl-6'
        data={data ?? []}
        columns={columns}
        onEdit={handleEdit}
        onEstatus={handleStatus}
      />
    </>
  )
}
