import {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {updatePassword} from '../redux/AuthCRUD'
import {useLocation, useHistory, Link} from 'react-router-dom'
import clsx from 'clsx'
const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
})

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function ResetPassword() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true)

      updatePassword(values.password)

      setTimeout(() => {
        history.push('/auth/login') // Redirigir después de 2 segundos
      }, 2000)
      setLoading(false)
    },
  })

  return (
    <div className='reset-password-form'>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_reset_password'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Reestablecer contraseña</h1>

          <div className='text-gray-400 fw-bold fs-4'>Ingrese su nueva contraseña.</div>
        </div>

        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Contraseña</label>
          <input
            type='text'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.password && formik.errors.password},
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

        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_reset_password_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
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
              id='kt_reset_password_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancelar
            </button>
          </Link>{' '}
        </div>
      </form>
    </div>
  )
}
