import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesPatient(props: any) {
  const Calendario = lazy(() => import('../../../pages/patientViews/calendario/index'))

  return (
    <Switch>
      <Route path={`${props.match.path}/calendario`} component={Calendario} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
