import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesAdmin(props: any) {
  const IngresoPersona = lazy(() => import('../../../pages/admin/ingresoPersonal/index'))
  const Municipios = lazy(() => import('../../../pages/admin/municipios'))
  const Departamentos = lazy(() => import('../../../pages/admin/departamentos'))
  const Roles = lazy(() => import('../../../pages/admin/rol'))
  return (
    <Switch>
      <Route path={`${props.match.path}/ingreso-persona`} component={IngresoPersona} />
      <Route path={`${props.match.path}/departamentos`} component={Departamentos} />
      <Route path={`${props.match.path}/municipios`} component={Municipios} />
      <Route path={`${props.match.path}/roles`} component={Roles} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
