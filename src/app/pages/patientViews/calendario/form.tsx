import {useContext, useState} from 'react'
import {Button, Modal, Form, Row, Col, Tab, Tabs} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton'
import FormularioSintomas from './sintomas/index'
import {showNotification} from '../../../services/alertServices'
const formatDate = (date: any) => {
  if (!date) return ''
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

const validationSchema = Yup.object().shape({
  horasSueno: Yup.string().required('Este campo es obligatorio'),
  actividadFisica: Yup.string().required('Este campo es obligatorio'),
  horasActividadFisica: Yup.string().required('Este campo es obligatorio'),
  consumeAlcohol: Yup.string().required('Este campo es obligatorio'),
  consumeTabaco: Yup.string().required('Este campo es obligatorio'),
  fecha: Yup.date().required('Este campo es obligatorio').nullable(),
})

export const Formulario = () => {
  const {toggleModal, show, selectedItem, opcion, createUpdate, selectedFecha, data} =
    useContext(ContentContext)
  const [key, setKey] = useState('form1')

  return (
    <>
      <Modal
        show={show}
        onHide={() => toggleModal && toggleModal(0)}
        backdrop='static'
        centered
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-uppercase h1'>Registro Diario</Modal.Title>
          <CustomCloseButton onClick={() => toggleModal && toggleModal(0)} />
        </Modal.Header>
        <Modal.Body>
          <Tabs id='controlled-tab-example' activeKey={key} onSelect={(k: any) => setKey(k)}>
            <Tab eventKey='form1' title='Registro'>
              <Formik
                initialValues={{
                  horasSueno: selectedItem?.horasSueno || '',
                  actividadFisica: selectedItem?.actividadFisica || '',
                  horasActividadFisica: selectedItem?.horasActividadFisica || '',
                  consumeAlcohol: selectedItem?.consumeAlcohol || 'No',
                  consumeTabaco: selectedItem?.consumeTabaco || 'No',
                  fecha: selectedItem?.fecha || formatDate(selectedFecha),
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, {resetForm}) => {
                  // Validación personalizada para evitar duplicados de fecha
                  const fechaYaExiste = data?.some(
                    (item) => item.fecha === values.fecha && item.id !== selectedItem?.id
                  )

                  if (fechaYaExiste) {
                    showNotification(
                      5,
                      'Fecha No Disponible',
                      'Ya existe un registro en esta fecha. Elija otra fecha.'
                    )
                    return
                  }

                  // Si no existe la fecha, entonces se puede crear o actualizar
                  createUpdate({
                    fecha: values?.fecha,
                    horasSueno: values?.horasSueno,
                    actividadFisica: values?.actividadFisica,
                    horasActividadFisica: values?.horasActividadFisica,
                    consumeAlcohol: values?.consumeAlcohol,
                    consumeTabaco: values?.consumeTabaco,
                    idPersona: 3,
                    id: selectedItem?.id,
                  })

                  resetForm()
                }}
              >
                {({errors, touched}) => (
                  <FormikForm>
                    <Row className='mt-4'>
                      <Col xs={6} md={6} lg={4}>
                        <Form.Group>
                          <Form.Label>
                            Horas Sueño <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field name='horasSueno' className='form-control' />
                          {errors.horasSueno && touched.horasSueno ? (
                            <div className='text-danger'>{errors.horasSueno}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs={6} md={6} lg={4} className='mb-4'>
                        <Form.Group>
                          <Form.Label>
                            Actividad Fisica <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field name='actividadFisica' className='form-control' />
                          {errors.actividadFisica && touched.actividadFisica ? (
                            <div className='text-danger'>{errors.actividadFisica}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={12} lg={4}>
                        <Form.Group>
                          <Form.Label>
                            Fecha <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field name='fecha' type='date' className='form-control' />
                          {errors.fecha && touched.fecha ? (
                            <div className='text-danger'>{errors.fecha}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={12} lg={12} className='mb-4 mt-4'>
                        <Form.Group>
                          <Form.Label>
                            Horas Actividad Fisica <span className='text-danger'>*</span>
                          </Form.Label>
                          <Field name='horasActividadFisica' className='form-control' />
                          {errors.horasActividadFisica && touched.horasActividadFisica ? (
                            <div className='text-danger'>{errors.horasActividadFisica}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col
                        xs={6}
                        md={6}
                        lg={6}
                        className='mb-4 d-flex justify-content-center align-items-center flex-column'
                      >
                        <Form.Group className='d-flex justify-content-center align-items-center flex-column'>
                          <Form.Label>
                            Consume Alcohol <span className='text-danger'>*</span>
                          </Form.Label>
                          <div>
                            <label className='me-3'>
                              <Field
                                type='radio'
                                name='consumeAlcohol'
                                value='Si'
                                className='me-1'
                              />
                              Sí
                            </label>
                            <label>
                              <Field
                                type='radio'
                                name='consumeAlcohol'
                                value='No'
                                className='me-1'
                              />
                              No
                            </label>
                          </div>
                          {errors.consumeAlcohol && touched.consumeAlcohol ? (
                            <div className='text-danger'>{errors.consumeAlcohol}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col
                        xs={6}
                        md={6}
                        lg={6}
                        className='mb-4 d-flex justify-content-center align-items-center flex-column'
                      >
                        <Form.Group className='d-flex justify-content-center align-items-center flex-column'>
                          <Form.Label>
                            Consume Tabaco <span className='text-danger'>*</span>
                          </Form.Label>
                          <div>
                            <label className='me-3'>
                              <Field
                                type='radio'
                                name='consumeTabaco'
                                value='Si'
                                className='me-1'
                              />
                              Sí
                            </label>
                            <label>
                              <Field
                                type='radio'
                                name='consumeTabaco'
                                value='No'
                                className='me-1'
                              />
                              No
                            </label>
                          </div>
                          {errors.consumeTabaco && touched.consumeTabaco ? (
                            <div className='text-danger'>{errors.consumeTabaco}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col className='d-flex justify-content-center align-items-center flex-column'>
                        <Button type='submit' variant='primary' className='mt-3'>
                          {opcion === 1 ? 'Actualizar' : 'Crear'}
                        </Button>
                      </Col>
                    </Row>
                  </FormikForm>
                )}
              </Formik>
            </Tab>
            <Tab eventKey='form2' title='Sintomas'>
              <FormularioSintomas />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Formulario
