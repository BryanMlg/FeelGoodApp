import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesPatient(props: any) {
  const Calendario = lazy(() => import('../../../pages/patientViews/calendario/index'))
  const Receta = lazy(() => import('../../../pages/patientViews/receta/index'))
  return (
    <Switch>
      <Route path={`${props.match.path}/calendario`} component={Calendario} />
      <Route path={`${props.match.path}/receta`} component={Receta} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
