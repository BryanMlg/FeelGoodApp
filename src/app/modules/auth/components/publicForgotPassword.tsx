import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../redux/AuthCRUD'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email requerido.'),
})

export function PublicForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.email)
          .then(() => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('Failed to send password reset email')
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>¿Olvido su contraseña?</h1>

          <div className='text-gray-400 fw-bold fs-4'>Ingrese su email para reestablecer su contraseña.</div>
        </div>

        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Ups... Parece hubo un error.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Reestableciemiento de contraseña enviado. Porfavor, revisa tu correo electronico</div>
          </div>
        )}

        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>

        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg fw-bolder me-4'
            style={{background: '#ba7b7c'}}
          >
            <span className='indicator-label'>Enviar</span>
            {loading && (
              <span className='indicator-progress'>
                Espere...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancelar
            </button>
          </Link>{' '}
        </div>
      </form>
    </>
  )
}
