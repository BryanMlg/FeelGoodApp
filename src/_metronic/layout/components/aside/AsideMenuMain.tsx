/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../helpers'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {AsideMenuItem} from './AsideMenuItem'
import {MenuPatient} from './menuVertical/menuPatient'
import {MenuMedic} from './menuVertical/menuMedic'
import {MenuAdmin} from './menuVertical/menuAdmin'
export function AsideMenuMain() {
  const intl = useIntl()
  const user = useSelector((state: RootState) => state.auth.dataUser)
  const isMedic = [3].includes(user?.rolId)
  const isPatient = [2].includes(user?.rolId)
  const isAdmin = [1].includes(user?.rolId)
  return (
    <>
      {(isAdmin || isMedic) && (
        <AsideMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          fontIcon='bi-app-indicator'
        />
      )}
      {isMedic && <MenuMedic />}
      {isPatient && <MenuPatient />}
      {isAdmin && <MenuAdmin />}
    </>
  )
}
