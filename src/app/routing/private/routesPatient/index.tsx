import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesPatient(props: any) {
  const Calendario = lazy(() => import('../../../pages/userViews/calendario/calendar'))

  return (
    <Switch>
      <Route path={`${props.match.path}/calendario`} component={Calendario} />

      {/* Asegúrate de que la ruta de redirección sea absoluta */}
      <Redirect to='/error/404' />
    </Switch>
  )
}
