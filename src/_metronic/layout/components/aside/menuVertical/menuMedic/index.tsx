/* eslint-disable react/jsx-no-target-blank */

// import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from '../../AsideMenuItemWithSub'
import {AsideMenuItem} from '../../AsideMenuItem'

export function MenuMedic() {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Medico</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/medico'
        title='Menú'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/medico/sintomas' title='Registro Síntomas' hasBullet={true} />
        <AsideMenuItem to='/medico/departamentos' title='Registro Departamentos' hasBullet={true} />
        <AsideMenuItem to='/medico/municipios' title='Registro Municipios' hasBullet={true} />
        <AsideMenuItem to='/medico/roles' title='Registro Roles' hasBullet={true} />
        <AsideMenuItem to='/medico/pacientes' title='Pacientes' hasBullet={true} />
        <AsideMenuItem to='/medico/enfermedades' title='Registro Enfermedades' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
