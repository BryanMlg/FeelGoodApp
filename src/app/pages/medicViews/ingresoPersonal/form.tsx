import {useContext, useState} from 'react'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton'
import CustomSelect from '../../../modules/utility/customSelect/customSelect'

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
  enfermedades: Yup.string().required('Este campo es obligatorio'),
  descripcionEnfermedad: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {toggleModal, show, enfermedades} = useContext(ContentContext)
  const [selectedEnfermedad, setSelectedEnfermedad] = useState<string>('')

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
        size='xl' // Ajusta el tamaño del modal
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-uppercase h3'>Registro Personal</Modal.Title>
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
              enfermedades: '',
              descripcionEnfermedad: '',
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
                <Row className='mb-4'>
                  <Col xs={12} md={6} className='px-xl-15 px-lg-10'>
                    <h4 className='text-center mb-4'>Datos Personales</h4>
                    <hr className='mb-4' />
                    <Row>
                      <Col xs={12} md={12} lg={6}>
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
                      <Col xs={12} md={12} lg={6}>
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
                    <Row className='mt-4'>
                      <Col xs={12} md={12}>
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
                    <Row className='mt-4'>
                      <Col xs={12} md={6}>
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
                      <Col xs={12} md={6}>
                        <Form.Group controlId='formSegundoNombre'>
                          <Form.Label>Segundo Nombre</Form.Label>
                          <Field name='segundoNombre' className='form-control' />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='mt-4'>
                      <Col xs={12} md={6}>
                        <Form.Group controlId='formTercerNombre'>
                          <Form.Label>Tercer Nombre</Form.Label>
                          <Field name='tercerNombre' className='form-control' />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='mt-4'>
                      <Col xs={12} md={6}>
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
                      <Col xs={12} md={6}>
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
                    <Row className='mt-4'>
                      <Col xs={12} md={12} lg={6}>
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
                      <Col xs={12} md={12} lg={6}>
                        <Form.Group controlId='formApellidoDeCasada'>
                          <Form.Label>Apellido de Casada</Form.Label>
                          <Field name='apellidoDeCasada' className='form-control' />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='mt-4'>
                      <Col xs={12} md={6}>
                        <Form.Group controlId='formEdad'>
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
                  </Col>
                  <Col xs={12} md={6} className='px-xl-15 px-lg-10'>
                    <h4 className='text-center mb-4'>Enfermedades</h4>
                    <hr className='mb-4' />
                    <Row>
                      <Col xs={12} md={12}>
                        <CustomSelect
                          fieldName='enfermedades'
                          label='Enfermedades'
                          options={enfermedades}
                          onChange={(value) => setSelectedEnfermedad(value)} // Actualizamos el estado
                          required
                        />
                        {errors.enfermedades && touched.enfermedades ? (
                          <div className='text-danger'>{errors.enfermedades}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row className='mt-4'>
                      <Col xs={12}>
                        {selectedEnfermedad && (
                          <Form.Group controlId='formEnfermedadDescripcion'>
                            <Form.Label>Descripción de la Enfermedad</Form.Label>
                            <Field
                              as='textarea'
                              name='descripcionEnfermedad'
                              className='form-control'
                              rows={3}
                            />
                            {errors.descripcionEnfermedad && touched.descripcionEnfermedad ? (
                              <div className='text-danger'>{errors.descripcionEnfermedad}</div>
                            ) : null}
                          </Form.Group>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Button type='submit' variant='primary'>
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
