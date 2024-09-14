import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {RoutesPatient} from './private/routesPatient'
import { RoutesMedic } from './private/routesMedic'
import { RoutesAdmin } from './private/routesAdmin'
import { RoutesProcess } from './private/profile'
export function PrivateRoutes() {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/paciente' component={RoutesPatient} />
        <Route path='/medico' component={RoutesMedic} />
        <Route path='/admin' component={RoutesAdmin} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/reset' component={RoutesProcess} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='/error/404' />
      </Switch>
    </Suspense>
  )
}
