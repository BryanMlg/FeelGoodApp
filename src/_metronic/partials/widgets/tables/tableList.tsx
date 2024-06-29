import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'

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
  itemsPerPage?: number
}

const TableList = <T extends {}>({className = '', data, columns, itemsPerPage = 7}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={`card ${className} mt-3`}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
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
                        {column.accessor === 'image' ? (
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-50px me-5'>
                              <img src={value as string} className='' alt='' />
                            </div>
                            <div className='d-flex justify-content-start flex-column'>
                              <a
                                href='*'
                                className='text-dark fw-bolder text-hover-primary mb-1 fs-6'
                              >
                                {(item as Record<string, unknown>)['name'] as string}
                              </a>
                              <span className='text-muted fw-bold text-muted d-block fs-7'>
                                {(item as Record<string, unknown>)['technologies'] as string}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <a
                            href='*'
                            className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'
                          >
                            {value as React.ReactNode}
                          </a>
                        )}
                      </td>
                    )
                  })}
                  <td className='text-end'>
                    <a
                      href='*'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='*'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='*'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
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
