import {useContext, useState} from 'react'
import {Button, Form, Row, Col, Card} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  persona: Yup.string().required('Este campo es obligatorio'),
  peso: Yup.string().required('Este campo es obligatorio'),
  altura: Yup.string().required('Este campo es obligatorio'),
  pruebaHormonal: Yup.string().required('Este campo es obligatorio'),
  nivelColesterol: Yup.string().required('Este campo es obligatorio'),
  glucosaSangre: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {createUpdate, selectedItem, selectedItemPrincipal, editar, setEditar, setSelectedItem} =
    useContext(ContentContext)

  // Estado para forzar el reinicio del componente
  const [componentKey, setComponentKey] = useState(0)

  const handleReset = () => {
    setSelectedItem(null)
    setEditar(false)
    setComponentKey((prevKey) => prevKey + 1) // Cambiar el key para reiniciar el componente
  }

  return (
    <Card>
      <Formik
        key={componentKey} // Aplicar el key aquí
        initialValues={{
          persona: selectedItemPrincipal?.id || '',
          peso: selectedItem?.peso || '',
          altura: selectedItem?.altura || '',
          pruebaHormonal: selectedItem?.pruebasHormonales || '',
          nivelColesterol: selectedItem?.nivelesColesterol || '',
          glucosaSangre: selectedItem?.glucosaSangre || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize={editar}
        onSubmit={(values, {resetForm}) => {
          createUpdate({
            idPersona: values?.persona,
            peso: values?.peso,
            altura: values?.altura,
            pruebasHormonales: values?.pruebaHormonal,
            nivelesColesterol: values?.nivelColesterol,
            glucosaSangre: values?.glucosaSangre,
            id: selectedItem?.id,
          })
          setSelectedItem(null)
          resetForm()
          setEditar(false)
        }}
      >
        {({errors, touched, resetForm}) => (
          <FormikForm>
            <Row className='mb-4 px-20'>
              <h4 className='text-center mb-4'>Salud General</h4>
              <hr className='mb-4' />
              <Row>
                <Col xs={12} md={6} lg={2}>
                  <Form.Group controlId='formPeso'>
                    <Form.Label>
                      Peso <span className='text-danger'>*</span>
                    </Form.Label>
                    <Field name='peso' className='form-control' />
                    {errors.peso && touched.peso ? (
                      <div className='text-danger'>{errors.peso}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <Form.Group controlId='formAltura'>
                    <Form.Label>
                      Altura <span className='text-danger'>*</span>
                    </Form.Label>
                    <Field name='altura' className='form-control' />
                    {errors.altura && touched.altura ? (
                      <div className='text-danger'>{errors.altura}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group controlId='formPruebaHormonal'>
                    <Form.Label>
                      Prueba Hormonal <span className='text-danger'>*</span>
                    </Form.Label>
                    <Field name='pruebaHormonal' className='form-control' />
                    {errors.pruebaHormonal && touched.pruebaHormonal ? (
                      <div className='text-danger'>{errors.pruebaHormonal}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <Form.Group controlId='formNivelColesterol'>
                    <Form.Label>
                      Nivel Colesterol <span className='text-danger'>*</span>
                    </Form.Label>
                    <Field name='nivelColesterol' className='form-control' />
                    {errors.nivelColesterol && touched.nivelColesterol ? (
                      <div className='text-danger'>{errors.nivelColesterol}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <Form.Group controlId='formGlucosaSangre'>
                    <Form.Label>
                      Glucosa Sangre <span className='text-danger'>*</span>
                    </Form.Label>
                    <Field name='glucosaSangre' className='form-control' />
                    {errors.glucosaSangre && touched.glucosaSangre ? (
                      <div className='text-danger'>{errors.glucosaSangre}</div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
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
    </Card>
  )
}

export default Formulario
