/* eslint-disable react/jsx-no-target-blank */

// import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from '../../AsideMenuItemWithSub'
import {AsideMenuItem} from '../../AsideMenuItem'

export function MenuPatient() {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Usuario</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/paciente'
        title='Paciente'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='/paciente/calendario' title='Calendario' hasBullet={true} />
        <AsideMenuItem to='/paciente/enfermedades' title='Enfermedades' hasBullet={true} />
        <AsideMenuItem to='/paciente/sintomas' title='Sintomas' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
