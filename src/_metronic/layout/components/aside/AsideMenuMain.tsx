/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../helpers'
import {AsideMenuItem} from './AsideMenuItem'
import {MenuPatient} from './menuVertical/menuPatient'
import { MenuMedic } from './menuVertical/menuMedic'
export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <MenuPatient />
      <MenuMedic />
    </>
  )
}
