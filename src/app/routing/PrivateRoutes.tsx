import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import Dashboard from '../pages/dashboard'
import {RoutesPatient} from './private/routesPatient'
import { RoutesMedic } from './private/routesMedic'
import { RoutesAdmin } from './private/routesAdmin'
import { RoutesProcess } from './private/profile'
import {useSelector} from 'react-redux'
import {RootState} from '../../setup'
export function PrivateRoutes() {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const user = useSelector((state: RootState) => state.auth.dataUser)
  const isPatient = [2].includes(user?.rolId)
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/paciente' component={RoutesPatient} />
        <Route path='/medico' component={RoutesMedic} />
        <Route path='/admin' component={RoutesAdmin} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/reset' component={RoutesProcess} />
        <Redirect from='/auth' to={isPatient ? '/paciente/calendario' : '/dashboard'} />
        <Redirect exact from='/' to={isPatient ? '/paciente/calendario' : '/dashboard'} />
        <Redirect to='/error/404' />
      </Switch>
    </Suspense>
  )
}
