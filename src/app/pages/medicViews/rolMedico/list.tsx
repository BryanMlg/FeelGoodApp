import React from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

type municipiosType = {
  nombre: string
  id: number
  estado: number
}

export default function List() {
  const data: municipiosType[] = [
    {
      nombre: 'Cirujano',
      id: 1,
      estado: 1,
    },
    {
      nombre: 'Dentista',
      id: 2,
      estado: 0,
    },
    {
      nombre: 'Otorrinonaringologo',
      id: 3,
      estado: 1,
    },
    {
      nombre: 'Enfermera',
      id: 4,
      estado: 1,
    },
  ]

  const columns: ColumnConfig<municipiosType>[] = [
    {
      header: 'Rol',
      accessor: (item: municipiosType) => (
        <div className='d-flex align-items-center'>
          <div className='d-flex justify-content-start flex-column'>
            <a href='*' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {item.nombre}
            </a>
          </div>
        </div>
      ),
      width: '325px',
    },

    {
      header: 'Estado',
      accessor: (item: municipiosType) => (
        <span
          className={`badge ${
            item.estado === 1 ? 'badge-light-success' : 'badge-light-danger'
          } fs-7 fw-bold`}
        >
          {item.estado === 1 ? 'Activo' : 'Desactivado'}
          {console.log(item)}
        </span>
      ),
      width: '150px',
    },
  ]

  return (
    <>
      <TableList className='mb-5 mb-xl-6' data={data} columns={columns} />
    </>
  )
}
