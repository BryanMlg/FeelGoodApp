import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesMedic(props: any) {
  const Sintomas = lazy(() => import('../../../pages/medicViews/sintomas'))
  const Municipios = lazy(() => import('../../../pages/medicViews/municipios'))
  const Departamentos = lazy(() => import('../../../pages/medicViews/departamentos'))
  const Roles = lazy(() => import('../../../pages/medicViews/rolMedico'))
  const IngresoPersonal = lazy(() => import('../../../pages/medicViews/ingresoPersonal'))
  return (
    <Switch>
      <Route path={`${props.match.path}/sintomas`} component={Sintomas} />
      <Route path={`${props.match.path}/departamentos`} component={Departamentos} />
      <Route path={`${props.match.path}/municipios`} component={Municipios} />
      <Route path={`${props.match.path}/roles`} component={Roles} />
      <Route path={`${props.match.path}/registro-personal`} component={IngresoPersonal} />
      {/* Asegúrate de que la ruta de redirección sea absoluta */}
      <Redirect to='/error/404' />
    </Switch>
  )
}
