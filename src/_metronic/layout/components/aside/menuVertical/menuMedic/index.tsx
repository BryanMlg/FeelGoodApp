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
        title='Menu'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/medico/sintomas' title='Sintomas' hasBullet={true} />
        <AsideMenuItem to='/medico/departamentos' title='Departamentos' hasBullet={true} />
        <AsideMenuItem to='/medico/municipios' title='Municipios' hasBullet={true} />
        <AsideMenuItem to='/medico/roles' title='Roles' hasBullet={true} />
        <AsideMenuItem to='/medico/registro-personal' title='Registro Personal' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
