import {useContext} from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  descripcion: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {createUpdate, selectedItem, editar, setEditar, setSelectedItem} =
    useContext(ContentContext)

  const handleReset = () => {
    setSelectedItem(null)
    setEditar(false)
  }

  return (
    <>
      <Formik
        initialValues={{
          descripcion: selectedItem?.descripcion || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          createUpdate({
            descripcion: values?.descripcion,
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
                <Form.Group controlId='descripcion'>
                  <Form.Label>
                    Descripción <span className='text-danger'>*</span>
                  </Form.Label>
                  <Field
                    as='textarea'
                    name='descripcion'
                    className='form-control'
                    rows={4} // Puedes ajustar la cantidad de filas según tus necesidades
                  />
                  {errors.descripcion && touched.descripcion ? (
                    <div className='text-danger'>{errors.descripcion}</div>
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
                    <Button type='button' onClick={handleReset} variant='danger' className='ms-4'>
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
