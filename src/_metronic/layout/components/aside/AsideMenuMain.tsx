/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../helpers'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {AsideMenuItem} from './AsideMenuItem'
import {MenuPatient} from './menuVertical/menuPatient'
import {MenuMedic} from './menuVertical/menuMedic'

export function AsideMenuMain() {
  const intl = useIntl()
  const user = useSelector((state: RootState) => state.auth.user)
  const isMedic = user?.roles?.includes(1)
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {isMedic && <MenuMedic />}
      {!isMedic && <MenuPatient />}
    </>
  )
}
