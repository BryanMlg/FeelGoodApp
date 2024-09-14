import {lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

export function RoutesProcess(props: any) {
  const resetPassword = lazy(() => import('../../../pages/resetPassword/index'))

  return (
    <Switch>
      <Route path={`${props.match.path}/email`} component={resetPassword} />
      <Route path={`${props.match.path}/email-error`} component={resetPassword} />
      <Redirect to='/error/404' />
    </Switch>
  )
}
