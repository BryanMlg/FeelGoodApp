import {useContext} from 'react'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton'
import SaludGeneral from './saludGeneral/index'
import AsignarMedico from './asignarMedico/index'
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
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es obligatorio'),
  fechaNacimiento: Yup.date().required('Este campo es obligatorio').nullable(),
})

export const Formulario = () => {
  const {
    toggleModal,
    show,
    labelDepartamento,
    labelMunicipio,
    labelRol,
    createUpdate,
    selectedItem,
    opcion,
  } = useContext(ContentContext)

  return (
    <>
      <Button
        variant='primary'
        size='sm'
        data-for='crear'
        data-tip='Crear'
        onClick={() => toggleModal && toggleModal(0)}
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
          {opcion <= 1 ? (
            <Formik
              initialValues={{
                departamento: selectedItem?.departamentoId || '',
                municipio: selectedItem?.municipioId || '',
                rol: selectedItem?.rolId || '',
                primerNombre: selectedItem?.primerNombres || '',
                segundoNombre: selectedItem?.segundoNombre || '',
                tercerNombre: selectedItem?.tercerNombre || '',
                primerApellido: selectedItem?.primerApellido || '',
                segundoApellido: selectedItem?.segundoApellido || '',
                dpi: selectedItem?.dpi || '',
                edad: selectedItem?.edad || '',
                email: selectedItem?.email || '',
                fechaNacimiento: selectedItem?.fechaNacimiento || null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, {resetForm}) => {
                createUpdate({
                  primerNombres: values?.primerNombre,
                  segundoNombre: values?.segundoNombre,
                  tercerNombre: values?.tercerNombre,
                  primerApellido: values?.primerApellido,
                  segundoApellido: values?.segundoApellido,
                  dpi: values?.dpi,
                  edad: values?.edad,
                  fechaNacimiento: values?.fechaNacimiento,
                  rolId: values?.rol,
                  municipioId: values?.municipio,
                  departamentoId: values?.departamento,
                  creadoPor: 1,
                  estado: 1,
                  email: values?.email,
                  id: selectedItem?.id,
                })
                resetForm()
                toggleModal && toggleModal(0)
              }}
            >
              {({errors, touched}) => (
                <FormikForm>
                  <Row className='mb-4 px-20'>
                    <h4 className='text-center mb-4'>Datos Personales</h4>
                    <hr className='mb-4' />
                    <Row>
                      <Col xs={12} md={12} lg={4} className='mt-4'>
                        <Form.Group controlId='formDepartamento'>
                          <Form.Label>
                            Departamento <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field as='select' name='departamento' className='form-control'>
                            <option value=''>Seleccione un departamento</option>
                            {labelDepartamento?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.nombre}
                              </option>
                            ))}
                          </Field>
                          {errors.departamento && touched.departamento ? (
                            <div className='text-danger'>{errors.departamento}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={12} lg={4} className='mt-4'>
                        <Form.Group controlId='formMunicipio'>
                          <Form.Label>
                            Municipio <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field as='select' name='municipio' className='form-control'>
                            <option value=''>Seleccione un municipio</option>
                            {labelMunicipio?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.nombre}
                              </option>
                            ))}
                          </Field>
                          {errors.municipio && touched.municipio ? (
                            <div className='text-danger'>{errors.municipio}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={12} lg={4} className='mt-4'>
                        <Form.Group controlId='formRol'>
                          <Form.Label>
                            Rol <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field as='select' name='rol' className='form-control'>
                            <option value=''>Seleccione un rol</option>
                            {labelRol?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.nombre}
                              </option>
                            ))}
                          </Field>
                          {errors.rol && touched.rol ? (
                            <div className='text-danger'>{errors.rol}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className='mt-4'>
                      <Col xs={12} md={6} lg={4}>
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
                      <Col xs={12} md={6} lg={4}>
                        <Form.Group controlId='formSegundoNombre'>
                          <Form.Label>Segundo Nombre</Form.Label>
                          <Field name='segundoNombre' className='form-control' />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={12} lg={4}>
                        <Form.Group controlId='formTercerNombre'>
                          <Form.Label>Tercer Nombre</Form.Label>
                          <Field name='tercerNombre' className='form-control' />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className='mt-4'>
                      <Col xs={12} md={6} lg={4}>
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
                      <Col xs={12} md={6} lg={4}>
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
                      <Col xs={12} md={6} lg={4}>
                        <Form.Group controlId='formEmail'>
                          <Form.Label>
                            Email <span className='text-danger'>*</span> {/* Nuevo campo */}
                          </Form.Label>
                          <Field name='email' type='email' className='form-control' />
                          {errors.email && touched.email ? (
                            <div className='text-danger'>{errors.email}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='mt-4'>
                      <Col xs={12} md={6} lg={2}>
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
                      <Col xs={12} md={6} lg={2} className='mb-4'>
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
                      <Col xs={12} md={12} lg={4}>
                        <Form.Group controlId='formFechaNacimiento'>
                          <Form.Label>
                            Fecha de Nacimiento <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field name='fechaNacimiento' type='date' className='form-control' />
                          {errors.fechaNacimiento && touched.fechaNacimiento ? (
                            <div className='text-danger'>{errors.fechaNacimiento}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
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
          ) : opcion === 3 ? (
            <SaludGeneral />
          ) : (
            opcion === 4 && <AsignarMedico />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Formulario
