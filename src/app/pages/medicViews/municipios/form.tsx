import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap-v5';
import { ContentContext } from './context';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton';

const validationSchema = Yup.object().shape({
  municipio: Yup.string().required('Debe Llenar El Campo'),
  selectField: Yup.string(),
});

export const Formulario = () => {
  const { toggleModal, show, labelDepartamento, createUpdate, selectedItem, opcion } = useContext(ContentContext);
  const [selectedOption, setSelectedOption] = useState<any>();
  useEffect(() => {
    if (opcion === 1) {
      const departamento = labelDepartamento?.find((dept) => dept.id === selectedItem.departamentoId)
      setSelectedOption(departamento)
    }else{
      setSelectedOption(null)
    }
  }, [selectedItem, labelDepartamento, opcion])
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
          <Modal.Title className='text-uppercase h1'>Registro Municipios</Modal.Title>
          <CustomCloseButton onClick={() => toggleModal && toggleModal(0)} />
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ municipio: selectedItem?.nombre, selectField: selectedOption?.id }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              createUpdate(selectedOption?.id || selectedOption, values?.municipio, selectedItem?.id)
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <FormikForm>
                
                <>{opcion === 0 ? <Form.Group controlId='formSelect'>
                  <Form.Label>Seleccione Un Departamento</Form.Label>
                  <Field
                    as='select'
                    name='selectField'
                    className='form-control'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      setFieldValue('selectField', value);
                      setSelectedOption(value);
                    }}
                  >
                    <option value=''>Seleccione...</option>
                    {labelDepartamento?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </Field>
                  {errors.selectField && touched.selectField ? (
                    <div className='text-danger'>{errors.selectField}</div>
                  ) : null}
                </Form.Group> : <Form.Label>Departamento - {selectedOption?.nombre}</Form.Label>}</>

                {selectedOption && (
                  <Form.Group controlId='formMunicipio' className='mt-5'>
                    <Form.Label>Nombre del Municipio</Form.Label>
                    <Field name='municipio' className='form-control' />
                    {errors.municipio && touched.municipio ? (
                      <div className='text-danger'>{errors.municipio}</div>
                    ) : null}
                  </Form.Group>
                )}

                <Button type='submit' variant='primary' className='mt-3'>
                  Enviar
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Formulario;