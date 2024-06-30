import {useContext} from 'react'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'
import CustomCloseButton from '../../../modules/modal/customCloseButton'

const validationSchema = Yup.object().shape({
  departamento: Yup.string().required('Este campo es obligatorio'),
  municipio: Yup.string().required('Este campo es obligatorio'),
  rol: Yup.string().required('Este campo es obligatorio'),
  primerNombre: Yup.string().required('Este campo es obligatorio'),
  segundoNombre: Yup.string(),
  tercerNombre: Yup.string(),
  primerApellido: Yup.string().required('Este campo es obligatorio'),
  segundoApellido: Yup.string().required('Este campo es obligatorio'),
  dpi: Yup.string().required('Este campo es obligatorio'),
  edad: Yup.string().required('Este campo es obligatorio'),
  apellidoDeCasada: Yup.string(),
})

export const Formulario = () => {
  const {toggleModal, show} = useContext(ContentContext)

  return (
    <>
      <Button
        variant='primary'
        size='sm'
        data-for='crear'
        data-tip='Crear'
        onClick={() => toggleModal && toggleModal(1)}
      >
        Agregar
      </Button>

      <Modal
        show={show}
        onHide={() => toggleModal && toggleModal(0)}
        backdrop='static'
        centered
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-uppercase h1'>Registro Personal</Modal.Title>
          <CustomCloseButton onClick={() => toggleModal && toggleModal(0)} />
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              departamento: '',
              municipio: '',
              rol: '',
              primerNombre: '',
              segundoNombre: '',
              tercerNombre: '',
              primerApellido: '',
              segundoApellido: '',
              dpi: '',
              apellidoDeCasada: '',
              edad: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              console.log('Formulario enviado:', values)
              // Aquí puedes manejar el envío del formulario, por ejemplo, guardando los datos
              resetForm()
              toggleModal && toggleModal(0)
            }}
          >
            {({errors, touched}) => (
              <FormikForm>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId='formDepartamento'>
                      <Form.Label>
                        Departamento <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field as='select' name='departamento' className='form-control'>
                        <option value=''>Seleccione un departamento</option>
                        {/* Agregar opciones de departamento aquí */}
                      </Field>
                      {errors.departamento && touched.departamento ? (
                        <div className='text-danger'>{errors.departamento}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='formMunicipio'>
                      <Form.Label>
                        Municipio <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field as='select' name='municipio' className='form-control'>
                        <option value=''>Seleccione un municipio</option>
                        {/* Agregar opciones de municipio aquí */}
                      </Field>
                      {errors.municipio && touched.municipio ? (
                        <div className='text-danger'>{errors.municipio}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={6}>
                    <Form.Group controlId='formRol'>
                      <Form.Label>
                        Rol <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field as='select' name='rol' className='form-control'>
                        <option value=''>Seleccione un rol</option>
                        {/* Agregar opciones de rol aquí */}
                      </Field>
                      {errors.rol && touched.rol ? (
                        <div className='text-danger'>{errors.rol}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={6}>
                    <Form.Group controlId='formPrimerNombre'>
                      <Form.Label>
                        Primer Nombre <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field name='primerNombre' className='form-control' />
                      {errors.primerNombre && touched.primerNombre ? (
                        <div className='text-danger'>{errors.primerNombre}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='formSegundoNombre'>
                      <Form.Label>Segundo Nombre</Form.Label>
                      <Field name='segundoNombre' className='form-control' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={6}>
                    <Form.Group controlId='formTercerNombre'>
                      <Form.Label>Tercer Nombre</Form.Label>
                      <Field name='tercerNombre' className='form-control' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={6}>
                    <Form.Group controlId='formPrimerApellido'>
                      <Form.Label>
                        Primer Apellido <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field name='primerApellido' className='form-control' />
                      {errors.primerApellido && touched.primerApellido ? (
                        <div className='text-danger'>{errors.primerApellido}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='formSegundoApellido'>
                      <Form.Label>
                        Segundo Apellido <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field name='segundoApellido' className='form-control' />
                      {errors.segundoApellido && touched.segundoApellido ? (
                        <div className='text-danger'>{errors.segundoApellido}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={6}>
                    <Form.Group controlId='formDpi'>
                      <Form.Label>
                        DPI <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field name='dpi' className='form-control' />
                      {errors.dpi && touched.dpi ? (
                        <div className='text-danger'>{errors.dpi}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='formApellidoDeCasada'>
                      <Form.Label>Apellido de Casada</Form.Label>
                      <Field name='apellidoDeCasada' className='form-control' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col md={2}>
                    <Form.Group controlId='formTercerNombre'>
                      <Form.Label>
                        Edad <span className='text-danger'>*</span>
                      </Form.Label>
                      <Field name='edad' className='form-control' />
                      {errors.edad && touched.edad ? (
                        <div className='text-danger'>{errors.edad}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className='d-flex justify-content-end '>
                    <Button type='submit' variant='primary' className='mt-5'>
                      Enviar
                    </Button>
                  </Col>
                </Row>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Formulario
