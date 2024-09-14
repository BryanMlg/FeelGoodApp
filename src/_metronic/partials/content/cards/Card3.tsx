import {FC} from 'react'
import {useLocation} from 'react-router-dom'
import {KTSVG} from '../../../helpers'
import {useAuthHeaders} from '../../../../app/modules/utility/hooks/useAuthHeathers'

const Card3: FC<any> = () => {
  const location = useLocation()
  const {dataUser} = useAuthHeaders()

  const imageUrl =
    location.pathname === '/reset/email'
      ? 'https://static.vecteezy.com/system/resources/previews/017/350/123/original/green-check-mark-icon-in-round-shape-design-png.png'
      : 'https://static.vecteezy.com/system/resources/previews/022/068/710/original/rejected-sign-and-symbol-clip-art-free-png.png'

  const mensaje =
    location.pathname === '/reset/email'
      ? 'Se Envio un Correo Electronico al Correo de la Cuenta Asociada'
      : 'Parece que ha habido un Error, Comuniquese con el Administrador.'
      

  return (
    <div className='card'>
      <div className='card-body d-flex flex-center flex-column p-9'>
        <div className='mb-5'>
          <div className='symbol symbol-75px symbol-circle'>
            <img alt='Pic' src={imageUrl} />
          </div>
        </div>

        <a href='#' className='fs-4 text-gray-800 text-hover-primary fw-bolder mb-0'>
          {dataUser?.primerNombres} {dataUser?.primerApellido}
        </a>

        <div className='fw-bold text-gray-400 mb-6'>
          {dataUser?.rolId === 1 ? 'Administrador' : dataUser?.rolId === 2 ? 'Paciente' : 'Medico'}
        </div>

        <div className='d-flex flex-center flex-wrap mb-5'>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mx-3 mb-3'>
            <div className='fw-bold text-gray-400'>
              {mensaje} <span className='text-danger'> {location.pathname !== '/reset/email' && '- Hubo un error al enviar el correo'}</span>
            </div>
          </div>
        </div>

        <a href={`mailto:${dataUser?.email}`} className='btn btn-sm btn-light'>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
          {dataUser?.email}
        </a>
      </div>
    </div>
  )
}

export {Card3}
