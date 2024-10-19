/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {loginWithSupabase} from '../redux/AuthCRUD'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Correo electronico requerido.'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Contraseña requerida.'),
})

const initialValues = {
  email: '',
  password: '',
}

//Local

// const initialValues = {
//   email: 'medico@demo.com',
//   password: 'demo',
// }

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const data = await loginWithSupabase(values.email, values.password)
        if (data) {
          const {session, dataUser} = data
          if (session?.access_token) {
            setLoading(false)
            dispatch(auth.actions.login(session.access_token))
            console.log('login', dataUser)
            dispatch(auth.actions.setUser(dataUser))
          } else {
            throw new Error('Las credenciales de inicio de sesión son incorrectos')
          }
        } else {
          throw new Error('Los detalles de inicio de sesión son incorrectos')
        }
      } catch (error) {
        setLoading(false)
        setSubmitting(false)

        if (error instanceof Error) {
          setStatus(error.message)
        } else {
          setStatus('Ha ocurrido un error en el inicio de sesión')
        }
      }
    },
  })

  //Local
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: loginSchema,
  //   onSubmit: (values, {setStatus, setSubmitting}) => {
  //     setLoading(true)
  //     setTimeout(() => {
  //       login(values.email, values.password)
  //         .then(({data: {accessToken}}) => {
  //           setLoading(false)
  //           console.log(accessToken, values)
  //           dispatch(auth.actions.login(accessToken))
  //         })
  //         .catch(() => {
  //           setLoading(false)
  //           setSubmitting(false)
  //           setStatus('The login detail is incorrect')
  //         })
  //     }, 1000)
  //   },
  // })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Iniciar Sesión</h1>
      </div>

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <>
          {/* <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>
              Utiliza la cuenta <strong>medico@demo.com o paciente@demo.com</strong> y la contraseña{' '}
          <strong>demo</strong> para continuar.
            </div>
          </div> */}
        </>
      )}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Correo Electronico</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contraseña</label>
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg w-100 mb-5'
          style={{background: '#ba7b7c'}}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continuar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        {/* 
        <div className='text-center text-muted text-uppercase fw-bolder mb-5'>O</div>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
      </div>
    </form>
  )
}
