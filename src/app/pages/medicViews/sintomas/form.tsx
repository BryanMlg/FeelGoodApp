import {useContext} from 'react'
import {Button, Modal, Form} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import {Formik, Field, Form as FormikForm} from 'formik'
import * as Yup from 'yup'
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton'
const validationSchema = Yup.object().shape({
  sintoma: Yup.string().required('Este campo es obligatorio'),
})

export const Formulario = () => {
  const {toggleModal, show, createUpdate, selectedItem, opcion} = useContext(ContentContext)
 

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
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-uppercase h1'>Registro Sintomas</Modal.Title>
          <CustomCloseButton onClick={() => toggleModal && toggleModal(0)} />
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{sintoma: selectedItem?.nombre || ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              createUpdate(values?.sintoma, selectedItem?.id)

              resetForm()
              toggleModal && toggleModal(0)
            }}
          >
            {({errors, touched}) => (
              <FormikForm>
                <Form.Group controlId='formSymptom'>
                  <Form.Label>Nombre de la Enfermedad</Form.Label>
                  <Field name='sintoma' className='form-control' />
                  {errors.sintoma && touched.sintoma ? (
                    <div className='text-danger'>{errors.sintoma}</div>
                  ) : null}
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                  {opcion === 1 ? 'Actualizar' : 'Crear'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Formulario
