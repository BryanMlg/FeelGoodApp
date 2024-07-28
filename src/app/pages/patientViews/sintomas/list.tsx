import React from 'react'
import {TableList} from '../../../../_metronic/partials/widgets'

type ColumnConfig<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  width?: string
  className?: string
}

type DataItem = {
  image: string
  name: string
  description: string
  price: string
  priceStatus: string
  deposit: string
  depositStatus: string
  agent: string
  agentRole: string
  status: string
  statusBadgeClass: string
}

export default function List() {
  const data: DataItem[] = [
    {
      image: '/media/stock/600x400/img-1.jpg',
      name: 'Dolor Lumbar',
      description: 'dolor que se siente en la región lumbar o baja de la espalda',
      price: '$1000',
      priceStatus: 'Paid',
      deposit: '$200',
      depositStatus: 'Rejected',
      agent: 'John Doe',
      agentRole: 'Developer',
      status: 'Leve',
      statusBadgeClass: 'badge-light-primary',
    },
    {
      image: '/media/stock/600x400/img-1.jpg',
      name: 'Dolor de Cabeza',
      description: 'es un dolor o molestia en la cabeza, el cuero cabelludo o el cuello.',
      price: '$1000',
      priceStatus: 'Paid',
      deposit: '$200',
      depositStatus: 'Rejected',
      agent: 'John Doe',
      agentRole: 'Developer',
      status: 'Moderado',
      statusBadgeClass: 'badge-light-warning',
    },
    {
      image: '/media/stock/600x400/img-1.jpg',
      name: 'Vomitos',
      description: 'expulsión forzada del contenido del estómago a través de la boca',
      price: '$1000',
      priceStatus: 'Paid',
      deposit: '$200',
      depositStatus: 'Rejected',
      agent: 'John Doe',
      agentRole: 'Developer',
      status: 'Moderado',
      statusBadgeClass: 'badge-light-warning',
    },
    {
      image: '/media/stock/600x400/img-1.jpg',
      name: 'Fiebre',
      description: 'el aumento temporal en la temperatura del cuerpo en respuesta a alguna enfermedad o padecimiento.',
      price: '$1000',
      priceStatus: 'Paid',
      deposit: '$200',
      depositStatus: 'Rejected',
      agent: 'John Doe',
      agentRole: 'Developer',
      status: 'Grave',
      statusBadgeClass: 'badge-light-danger',
    },
  ]

  const columns: ColumnConfig<DataItem>[] = [
    {
      header: 'Product',
      accessor: (item: DataItem) => (
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5'>
            <img src={item.image} alt={item.name} />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href='*' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {item.name}
            </a>
            <span className='text-muted fw-bold text-muted d-block fs-7'>{item.description}</span>
          </div>
        </div>
      ),
      width: '325px',
    },
    // {header: 'Price', accessor: 'price', width: '125px'},
    // {header: 'Price Status', accessor: 'priceStatus', width: '125px'},
    // {header: 'Deposit', accessor: 'deposit', width: '125px'},
    // {header: 'Deposit Status', accessor: 'depositStatus', width: '125px'},
    // {header: 'Agent', accessor: 'agent', width: '200px'},
    // {header: 'Agent Role', accessor: 'agentRole', width: '150px'},
    {
      header: 'Estado',
      accessor: (item: DataItem) => (
        <span className={`badge ${item.statusBadgeClass} fs-7 fw-bold`}>{item.status}</span>
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
