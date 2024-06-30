import React from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

type personalType = {
  primerNombre: string
  segundoNombre: string
  tercerNombre: string
  primerApellido: string
  segundoApellido: string
  apellidoCasada: string
  departamento: string
  municipio: string
  rol: string
  id: number
  image: string
  estado: number
  dpi: string
}

export default function List() {
  const data: personalType[] = [
    {
      id: 1,
      primerNombre: 'Juan',
      segundoNombre: 'Carlos',
      tercerNombre: '',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      apellidoCasada: '',
      departamento: 'Guatemala',
      municipio: 'Ciudad de Guatemala',
      rol: 'Admin',
      image: 'https://via.placeholder.com/50',
      dpi: '1234 56789 0123',
      estado: 1,
    },
    {
      id: 2,
      primerNombre: 'María',
      segundoNombre: 'Luisa',
      tercerNombre: '',
      primerApellido: 'Ramírez',
      segundoApellido: 'Hernández',
      apellidoCasada: 'de López',
      departamento: 'Guatemala',
      municipio: 'Mixco',
      rol: 'User',
      image: 'https://via.placeholder.com/50',
      dpi: '9876 54321 6789',
      estado: 0,
    },
    {
      id: 3,
      primerNombre: 'Ana',
      segundoNombre: 'Beatriz',
      tercerNombre: 'Sofía',
      primerApellido: 'López',
      segundoApellido: 'Martínez',
      apellidoCasada: '',
      departamento: 'Guatemala',
      municipio: 'Villa Nueva',
      rol: 'Editor',
      image: 'https://via.placeholder.com/50',
      dpi: '4567 89012 3456',
      estado: 1,
    },
  ]

  const columns: ColumnConfig<personalType>[] = [
    {
      header: 'Municipio',
      accessor: (item: personalType) => (
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5'>
            <img src={item.image} alt={item.primerNombre} />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href='*' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {item.primerNombre} {item.segundoNombre} {item.tercerNombre} {item.primerApellido}{' '}
              {item.apellidoCasada}
            </a>
            <span className='text-muted fw-bold text-muted d-block fs-7'>{item.rol}</span>
          </div>
        </div>
      ),
      width: '325px',
    },
    {header: 'Departamento', accessor: 'departamento', width: '125px'},
    {header: 'Municipio', accessor: 'municipio', width: '125px'},
    {header: 'DPI', accessor: 'dpi', width: '125px'},
    {
      header: 'Estado',
      accessor: (item: personalType) => (
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
