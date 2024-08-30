import {useContext} from 'react'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'

const formatDate = (date: any) => {
  if (!date) return ''
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

const validationSchema = Yup.object().shape({
  sintoma: Yup.string().required('Este campo es obligatorio'),
  descripcion: Yup.string().required('Este campo es obligatorio'),
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
          sintoma: selectedItem?.idSintoma || '',
          descripcion: selectedItem?.descripcion || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          createUpdate({
            idSintoma: values?.sintoma,
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
                <Form.Group controlId='sintoma'>
                  <Form.Label>
                    Sintoma <span className='text-danger'>*</span>
                  </Form.Label>
                  <Field as='select' name='sintoma' className='form-control'>
                    <option value=''>Seleccione un Sintoma</option>
                    {labelSintomas?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </Field>
                  {errors.sintoma && touched.sintoma ? (
                    <div className='text-danger'>{errors.sintoma}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} lg={12} className='mb-4 mt-4'>
                <Form.Group>
                  <Form.Label>
                    Descripción <span className='text-danger'>*</span>
                  </Form.Label>
                  <Field name='descripcion' className='form-control' />
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
