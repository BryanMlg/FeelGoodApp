import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'
import {toAbsoluteUrl} from '../../../helpers'
import '../../../../app/css/loader.css'

type ActionButton<T> = {
  iconPath: string
  onClick: (item: T) => void
  className?: string
}

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

type Props<T> = {
  className?: string
  data: T[]
  columns: ColumnConfig<T>[]
  actionButtons?: ActionButton<T>[]
  itemsPerPageOptions?: number[]
  itemsPerPage?: number
  onEdit?: (item: T) => void
  onEstatus?: (item: T) => void
  showEditButton?: boolean
  showStatusButton?: boolean
  loading?: boolean // Prop para el estado de carga
}

const TableList = <T extends {}>({
  className = '',
  data,
  columns,
  actionButtons = [],
  itemsPerPageOptions = [5, 10, 20],
  itemsPerPage = 7,
  onEdit,
  onEstatus,
  showEditButton = true,
  showStatusButton = true,
  loading = false, // Valor predeterminado
}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage)

  const totalPages = Math.ceil(data.length / currentItemsPerPage)
  const startIndex = (currentPage - 1) * currentItemsPerPage
  const currentData = data.slice(startIndex, startIndex + currentItemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentItemsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  const defaultButtons: ActionButton<T>[] = []

  if (showEditButton) {
    defaultButtons.push({
      iconPath: toAbsoluteUrl('/media/icons/duotune/art/art005.svg'),
      onClick: (item) => onEdit?.(item),
      className: 'me-1',
    })
  }

  if (showStatusButton) {
    defaultButtons.push({
      iconPath: toAbsoluteUrl('/media/icons/duotune/general/gen027.svg'),
      onClick: (item) => onEstatus?.(item),
    })
  }

  const combinedButtons = [...defaultButtons, ...actionButtons]

  return (
    <div className={`card ${className} mt-3`}>
      <div className='card-body py-3'>
        {loading ? ( // Usar el loader personalizado
          <div className='text-center'>
            <div className='loader'></div>
          </div>
        ) : (
          <>
            <div className='d-flex justify-content-between mb-3'></div>
            <div className='table-responsive'>
              <table className='table align-middle gs-4 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className={`min-w-${column.width || 'auto'} ${column.className || ''}`}
                      >
                        {column.header}
                      </th>
                    ))}
                    <th className='min-w-200px text-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={index}>
                      {columns.map((column, colIndex) => {
                        const value =
                          typeof column.accessor === 'function'
                            ? column.accessor(item)
                            : (item as Record<string, unknown>)[column.accessor as string]

                        return (
                          <td key={colIndex}>
                            <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                              {value as React.ReactNode}
                            </div>
                          </td>
                        )
                      })}
                      <td className='text-end'>
                        {combinedButtons.map((button, btnIndex) => (
                          <i
                            key={btnIndex}
                            className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mr-2${
                              button.className || ''
                            }`}
                            onClick={() => button.onClick(item)}
                          >
                            <KTSVG path={button.iconPath} className='svg-icon-3' />
                          </i>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div className='d-flex justify-content-center align-items-center'>
                <select
                  id='itemsPerPage'
                  value={currentItemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className='form-select form-select-sm'
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <nav>
                <ul className='pagination'>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>
                      Anterior
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => handlePageChange(currentPage + 1)}>
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export {TableList}
