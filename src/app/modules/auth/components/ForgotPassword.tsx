import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { updatePassword } from '../redux/AuthCRUD';

// Valores iniciales del formulario
const initialValues = {
  password: '',
  confirmPassword: '',
};

// Esquema de validación para el formulario de contraseña
const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
});

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);

  const formik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);

      try {
        await updatePassword(values.password);
        setHasErrors(false);
        setStatus('Contraseña actualizada con éxito.');
      } catch (error) {
        setHasErrors(true);
        setStatus('Error al actualizar la contraseña.');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='card w-50 shadow-sm'>
        <div className='card-body p-5'>
          <form
            className='form fv-plugins-bootstrap5 fv-plugins-framework'
            noValidate
            id='kt_update_password_form'
            onSubmit={formik.handleSubmit}
          >
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>Actualizar Contraseña</h1>
              <div className='text-gray-400 fw-bold fs-4'>
                Ingresa y reingresa tu contraseña para reestablecerla.
              </div>
            </div>

            {hasErrors === true && (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>
                  Error al actualizar la contraseña. Inténtalo nuevamente.
                </div>
              </div>
            )}

            {hasErrors === false && (
              <div className='mb-10 bg-light-info p-8 rounded'>
                <div className='text-info'>Contraseña actualizada con éxito.</div>
              </div>
            )}

            <div className='fv-row mb-10'>
              <label className='form-label fw-bolder text-gray-900 fs-6'>Nueva Contraseña</label>
              <input
                type='password'
                placeholder='Nueva contraseña'
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  { 'is-invalid': formik.touched.password && formik.errors.password },
                  { 'is-valid': formik.touched.password && !formik.errors.password }
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

            <div className='fv-row mb-10'>
              <label className='form-label fw-bolder text-gray-900 fs-6'>
                Confirmar Nueva Contraseña
              </label>
              <input
                type='password'
                placeholder='Confirma la nueva contraseña'
                autoComplete='off'
                {...formik.getFieldProps('confirmPassword')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                  { 'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword }
                )}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.confirmPassword}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
              <button
                type='submit'
                id='kt_password_update_submit'
                className='btn btn-lg fw-bolder me-4'
                style={{background: '#ba7b7c'}}
              >
                <span className='indicator-label'>Actualizar Contraseña</span>
                {loading && (
                  <span className='indicator-progress'>
                    Por favor espera...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
