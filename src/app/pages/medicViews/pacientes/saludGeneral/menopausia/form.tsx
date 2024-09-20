import {useContext} from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  menopausia: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {createUpdate, selectedItem, editar, setEditar, setSelectedItem, labelSintomas} =
    useContext(ContentContext)
  const handleReset = () => {
    setSelectedItem(null)
    setEditar(false)
  }
  return (
    <>
      <Formik
        initialValues={{
          menopausia: selectedItem?.nivel_menopausia_id || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          createUpdate({
            nivelMenopausiaId: values?.menopausia,
            id: selectedItem?.id
          })
          setSelectedItem(null)
          setEditar(false)
          resetForm()
        }}
      >
        {({errors, touched}) => (
          <FormikForm>
            <Row className='mt-4'>
              <Col xs={12} md={12} lg={12} className='mt-4'>
                <Form.Group controlId='sintoma'>
                  <Form.Label>
                    Menopausia <span className='text-danger'>*</span>
                  </Form.Label>
                  <Field as='select' name='menopausia' className='form-control'>
                    <option value=''>Seleccione una opción</option>
                    {labelSintomas?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </Field>
                  {errors.menopausia && touched.menopausia ? (
                    <div className='text-danger'>{errors.menopausia}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col className='d-flex justify-content-center'>
                {editar ? (
                  <>
                    <Button type='submit' variant='warning'>
                      Actualizar
                    </Button>
                    <Button
                      type='button'
                      onClick={handleReset} // Utilizar el nuevo manejador de reset
                      variant='danger'
                      className='ms-4'
                    >
                      X
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type='submit' variant='primary'>
                      Guardar
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </>
  )
}

export default Formulario
