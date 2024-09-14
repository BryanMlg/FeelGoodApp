import {useContext} from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'



const validationSchema = Yup.object().shape({
  medico: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {createUpdate, selectedItem, editar, setEditar, setSelectedItem, labelMedicos} =
    useContext(ContentContext)
  const handleReset = () => {
    setSelectedItem(null)
    setEditar(false)
  }
  return (
    <>
      <Formik
        initialValues={{
          medico: selectedItem?.idMedico || '',
        
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          createUpdate({
            idMedico: values?.medico,
            id: selectedItem?.id,
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
                <Form.Group controlId='medico'>
                  <Form.Label>
                    Medico <span className='text-danger'>*</span>
                  </Form.Label>
                  <Field as='select' name='medico' className='form-control'>
                    <option value=''>Seleccione un Medico</option>
                    {labelMedicos?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.primerNombres + ' ' + option.primerApellido}
                      </option>
                    ))}
                  </Field>
                  {errors.medico && touched.medico ? (
                    <div className='text-danger'>{errors.medico}</div>
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
