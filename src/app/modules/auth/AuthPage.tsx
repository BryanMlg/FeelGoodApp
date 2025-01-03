/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
// import {Registration} from './components/Registration'
import { PublicForgotPassword } from './components/publicForgotPassword'
import { ResetPassword } from './components/resetPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        // backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid '>
        {/* begin::Logo */}
        <a href='#'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/feelGoodLogo.png')}
            className='h-250px'
          />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px rounded shadow-sm p-10 p-lg-15 mx-auto' style={{background: '#fcd5ce'}}>
          <Switch>
            <Route path='/auth/login' component={Login} />
            {/* <Route path='/auth/registration' component={Registration} /> */}
            <Route path='/auth/forgot-password' component={PublicForgotPassword} />
            <Route path='/auth/reset-password' component={ResetPassword} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      {/* <div className='d-flex flex-center flex-column-auto'>
        <a href='#'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/techDev.png')} className='h-100px' />
        </a>
      </div> */}
      {/* end::Footer */}
    </div>
  )
}
