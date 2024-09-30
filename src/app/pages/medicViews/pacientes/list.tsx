import {useContext} from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'
import {Persona} from './models/models'
import {ContentContext} from './context'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {data, toggleModal, setSelectedItem, Status, loading} = useContext(ContentContext)
  const handleEdit = (item: any) => {
    setSelectedItem(item)
    toggleModal(1)
  }
  const handleStatus = (item: any) => {
    Status(item?.id, item?.estado)
  }
  const handleSaludGeneral = (item: any) => {
    setSelectedItem(item)
    toggleModal(3)
  }

  const columns: ColumnConfig<Persona>[] = [
    {
      header: 'Persona',
      accessor: (item: Persona) => (
        <div className='d-flex align-items-center'>
          {/* <div className='symbol symbol-50px me-5'>
            <img src={''} alt={''} />
          </div> */}
          <div className='d-flex justify-content-start flex-column'>
            <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {item.persona_nombre}
            </div>
          </div>
        </div>
      ),
      width: '325px',
    },
    {header: 'Departamento', accessor: 'departamento_nombre', width: '125px'},
    {header: 'Municipio', accessor: 'municipio_nombre', width: '125px'},
    {header: 'DPI', accessor: 'dpi', width: '125px'},
    {header: 'Edad', accessor: 'edad', width: '75px'},
    {
      header: 'Estado',
      accessor: (item: Persona) => (
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
  const actionButtons = [
    {
      iconPath: toAbsoluteUrl('/media/icons/duotune/medicine/med001.svg'),
      onClick: (item: any) => {
        handleSaludGeneral(item)
      },
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
        actionButtons={actionButtons}
        loading={loading}
        editIcon='/media/icons/duotune/text/txt001.svg'
      />
    </>
  )
}
