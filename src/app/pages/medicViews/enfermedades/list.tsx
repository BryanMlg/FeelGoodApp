import {useContext} from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'
import {ContentContext} from './context'
import {Enfermedad} from './models/models'
type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {data, toggleModal, setSelectedItem, Status} = useContext(ContentContext)
  const handleEdit = (item: any) => {
    setSelectedItem(item)
    toggleModal(1)
  }
  const handleStatus = (item: any) => {
    Status(item?.id, item?.estado)
  }
  const columns: ColumnConfig<Enfermedad>[] = [
    {
      header: 'Enfermedad',
      accessor: (item: Enfermedad) => (
        <div className='d-flex align-items-center'>
          <div className='d-flex justify-content-start flex-column'>
            <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{item.nombre}</div>
          </div>
        </div>
      ),
      width: '325px',
    },

    {
      header: 'Estado',
      accessor: (item: Enfermedad) => (
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
