import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesMedic(props: any) {
  const Sintomas = lazy(() => import('../../../pages/userViews/sintomas'))

  return (
    <Switch>
      <Route path={`${props.match.path}/sintomas`} component={Sintomas} />

      {/* Asegúrate de que la ruta de redirección sea absoluta */}
      <Redirect to='/error/404' />
    </Switch>
  )
}
