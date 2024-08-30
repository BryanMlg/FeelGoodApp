import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'
import {toAbsoluteUrl} from '../../../helpers'
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
  itemsPerPage?: number
  onEdit?: (item: T) => void
  onEstatus?: (item: T) => void
}

const TableList = <T extends {}>({
  className = '',
  data,
  columns,
  actionButtons = [],
  itemsPerPage = 7,
  onEdit,
  onEstatus,
}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Botones predeterminados
  const defaultButtons: ActionButton<T>[] = [
    {
      iconPath: toAbsoluteUrl('/media/icons/duotune/art/art005.svg'),
      onClick: (item) => onEdit?.(item),
      className: 'me-1',
    },
    {
      iconPath: toAbsoluteUrl('/media/icons/duotune/general/gen027.svg'),
      onClick: (item) => onEstatus?.(item),
    },
  ]

  // Combinar botones predeterminados con los personalizados
  const combinedButtons = [...defaultButtons, ...actionButtons]

  return (
    <div className={`card ${className} mt-3`}>
      <div className='card-body py-3'>
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
          <nav>
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
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
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export {TableList}
