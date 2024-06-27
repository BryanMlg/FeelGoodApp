import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'
type Product = {
  image?: string
  name?: string
  technologies?: string
  price?: string
  priceStatus?: string
  deposit?: string
  depositStatus?: string
  agent?: string
  agentRole?: string
  status?: string
  statusBadgeClass?: string
}

type Props = {
  className: string
  data: Product[]
}

const TablesWidget11: React.FC<Props> = ({className, data}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={`card ${className} mt-3`}>
      {/* begin::Header */}
      <div className=' pt-8'></div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Product</th>
                <th className='min-w-125px'>Price</th>
                <th className='min-w-125px'>Deposit</th>
                <th className='min-w-200px'>Agent</th>
                <th className='min-w-150px'>Status</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {currentData.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-5'>
                        <img src={product?.image} className='' alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a  href='*' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                          {product.name}
                        </a>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {product.technologies}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                       href='*'
                      className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'
                    >
                      {product.price}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      {product.priceStatus}
                    </span>
                  </td>
                  <td>
                    <a
                       href='*'
                      className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'
                    >
                      {product.deposit}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      {product.depositStatus}
                    </span>
                  </td>
                  <td>
                    <a
                      href='*'
                      className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'
                    >
                      {product.agent}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      {product.agentRole}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${product.statusBadgeClass} fs-7 fw-bold`}>
                      {product.status}
                    </span>
                  </td>
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
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        {/* begin::Pagination */}
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
        {/* end::Pagination */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TablesWidget11}
