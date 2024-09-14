import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesAdmin(props: any) {
  const IngresoPersona = lazy(() => import('../../../pages/admin/ingresoPersonal/index'))

  return (
    <Switch>
      <Route path={`${props.match.path}/ingreso-persona`} component={IngresoPersona} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
