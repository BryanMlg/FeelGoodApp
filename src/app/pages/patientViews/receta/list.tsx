import {useContext} from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'
import {Receta} from './models/models'
import {ContentContext} from './context'
type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {data, Status, setSelectedItem, setEditar,loading} = useContext(ContentContext)
  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setEditar(true)
  }
  const handleStatus = (item: any) => {
    Status(item?.id, item?.estado)
  }
  const columns: ColumnConfig<Receta>[] = [
    {header: 'Descripción', accessor: 'descripcion', width: '125px'},
    {
      header: 'Estado',
      accessor: (item: Receta) => (
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
        loading={loading}
      />
    </>
  )
}