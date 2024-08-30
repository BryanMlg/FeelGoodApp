import {useContext} from 'react'
import {TableList} from '../../../../../_metronic/partials/widgets'
import {ParametrosSaludGeneral} from './models/models'
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
  const columns: ColumnConfig<ParametrosSaludGeneral>[] = [
    {
      header: 'Peso',
      accessor: (item: ParametrosSaludGeneral) => (
        <div className='d-flex align-items-center'>
          {/* <div className='symbol symbol-50px me-5'>
            <img src={''} alt={''} />
          </div> */}
          <div className='d-flex justify-content-start flex-column'>
            <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{item.peso}</div>
          </div>
        </div>
      ),
      width: '100px',
    },
    {header: 'Altura', accessor: 'altura', width: '125px'},
    {header: 'Glucosa en Sangre', accessor: 'glucosaSangre', width: '175px'},
    {header: 'Nivel Colesterol', accessor: 'nivelesColesterol', width: '175px'},
    {header: 'Prueba Hormonal', accessor: 'pruebasHormonales', width: '175px'},
    {
      header: 'Estado',
      accessor: (item: ParametrosSaludGeneral) => (
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
