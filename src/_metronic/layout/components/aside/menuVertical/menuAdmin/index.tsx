/* eslint-disable react/jsx-no-target-blank */

// import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from '../../AsideMenuItemWithSub'
import {AsideMenuItem} from '../../AsideMenuItem'

export function MenuAdmin() {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/admin'
        title='Procesos'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem to='/admin/ingreso-persona' title='Registro Usuarios' hasBullet={true} />
        <AsideMenuItem to='/admin/departamentos' title='Registro Departamentos' hasBullet={true} />
        <AsideMenuItem to='/admin/municipios' title='Registro Municipios' hasBullet={true} />
        <AsideMenuItem to='/admin/roles' title='Registro Roles' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
