import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesMedic(props: any) {
  const Sintomas = lazy(() => import('../../../pages/medicViews/sintomas'))
  const Enfermedades = lazy(() => import('../../../pages/medicViews/enfermedades'))
  const Pacientes = lazy(() => import('../../../pages/medicViews/pacientes'))
  return (
    <Switch>
      <Route path={`${props.match.path}/sintomas`} component={Sintomas} />
      <Route path={`${props.match.path}/enfermedades`} component={Enfermedades} />
      <Route path={`${props.match.path}/pacientes`} component={Pacientes} />
      {/* Asegúrate de que la ruta de redirección sea absoluta */}
      <Redirect to='/error/404' />
    </Switch>
  )
}
