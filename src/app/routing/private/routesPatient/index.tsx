import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesPatient(props: any) {
  const Calendario = lazy(() => import('../../../pages/patientViews/calendario/calendar'))
  const Enfermedades = lazy(() => import('../../../pages/patientViews/enfermedades'))
  const Sintomas = lazy(() => import('../../../pages/patientViews/sintomas'))
  return (
    <Switch>
      <Route path={`${props.match.path}/calendario`} component={Calendario} />
      <Route path={`${props.match.path}/enfermedades`} component={Enfermedades} />
      <Route path={`${props.match.path}/sintomas`} component={Sintomas} />
      {/* Asegúrate de que la ruta de redirección sea absoluta */}
      <Redirect to='/error/404' />
    </Switch>
  )
}
