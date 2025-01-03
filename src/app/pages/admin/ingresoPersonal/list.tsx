import {useContext} from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'
import {Persona} from './models/models'
import {ContentContext} from './context'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Badge, Row, Col} from 'react-bootstrap-v5'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

export default function List() {
  const {data, toggleModal, setSelectedItem, Status, setSearch, search, loading} =
    useContext(ContentContext)

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

  const handleAsignarMedico = (item: any) => {
    setSelectedItem(item)
    toggleModal(4)
  }

  const columns: ColumnConfig<Persona>[] = [
    {
      header: 'Persona',
      accessor: (item: Persona) => (
        <div className='d-flex align-items-center'>
          <div className='d-flex justify-content-start flex-column'>
            <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {item.primerNombres} {item.segundoNombre} {item.tercerNombre} {item.primerApellido}
            </div>
            <span className='text-muted fw-bold text-muted d-block fs-7'>{item.rol}</span>
          </div>
        </div>
      ),
      width: '325px',
    },
    {header: 'Departamento', accessor: 'municipioId', width: '125px'},
    {header: 'Municipio', accessor: 'departamentoId', width: '125px'},
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
      onClick: (item: any) => handleSaludGeneral(item),
    },
    ...(search === 2
      ? [
          {
            iconPath: toAbsoluteUrl('/media/icons/duotune/general/gen035.svg'),
            onClick: (item: any) => handleAsignarMedico(item),
          },
        ]
      : []),
  ]

  return (
    <>
      <Row className='mb-4'>
        <Col>
          <h3 className='text-center mt-3'>
            {search === 3 && <span className='text-primary'>Filtro Médico</span>}
            {search === 2 && <span className='text-black'>Filtro Paciente</span>}
            {search === null && <span className='text-muted'>Todos</span>}
          </h3>
          <Badge bg='primary' className='me-2 fs-5 cursor-pointer' onClick={() => setSearch(3)}>
            Médico
          </Badge>
          <Badge bg='secondary' className='fs-5 cursor-pointer' onClick={() => setSearch(2)}>
            Paciente
          </Badge>
          <Badge bg='dark' className='ms-2 fs-5 cursor-pointer' onClick={() => setSearch(null)}>
            Todos
          </Badge>
        </Col>
      </Row>
      <TableList
        className='mb-5 mb-xl-6'
        data={data ?? []}
        columns={columns}
        onEdit={handleEdit}
        onEstatus={handleStatus}
        actionButtons={actionButtons}
        loading={loading}
      />
    </>
  )
}
