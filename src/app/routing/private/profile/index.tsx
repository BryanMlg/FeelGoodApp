import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesProcess(props: any) {
  const forgotPassword = lazy(() => import('../../../modules/auth/components/ForgotPassword'))
  return (
    <Switch>
      <Route path={`${props.match.path}/email`} component={forgotPassword} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
