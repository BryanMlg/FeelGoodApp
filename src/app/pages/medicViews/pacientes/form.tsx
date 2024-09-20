import {useContext} from 'react'
import {Card, Modal, Row, Col} from 'react-bootstrap-v5'
import {ContentContext} from './context'
import CustomCloseButton from '../../../modules/utility/modal/customCloseButton'
import SaludGeneral from './saludGeneral/index'

export const Formulario = () => {
  const {toggleModal, show, selectedItem, opcion} = useContext(ContentContext)

  return (
    <>
      <Modal
        show={show}
        onHide={() => toggleModal && toggleModal(0)}
        backdrop='static'
        centered
        size={opcion <= 1 ? undefined : 'lg'}
        // Ajusta el tamaño del modal
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-uppercase h3'>{opcion === 1 ? 'Datos Persona' : 'Salud'}</Modal.Title>
          <CustomCloseButton onClick={() => toggleModal && toggleModal(0)} />
        </Modal.Header>
        <Modal.Body>
          {opcion <= 1 ? (
            <Card className='p-4'>
              <Row className='mb-3'>
                <Col xs={12} md={6} lg={6}>
                  <h6>Departamento:</h6>
                  <p>{selectedItem?.departamento_nombre || 'No disponible'}</p>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <h6>Municipio:</h6>
                  <p>{selectedItem?.municipio_nombre || 'No disponible'}</p>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <h6>Nombre Completo:</h6>
                  <p>{selectedItem?.persona_nombre || 'No disponible'}</p>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <h6>Email:</h6>
                  <p>{selectedItem?.email || 'No disponible'}</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h6>Fecha de Nacimiento:</h6>
                  <p>{selectedItem?.fecha_nacimiento || 'No disponible'}</p>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col xs={12} md={6} lg={6}>
                  <h6>DPI:</h6>
                  <p>{selectedItem?.dpi || 'No disponible'}</p>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <h6>Edad:</h6>
                  <p>{selectedItem?.edad || 'No disponible'}</p>
                </Col>
              </Row>
            </Card>
          ) : (
            opcion === 3 && <SaludGeneral />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Formulario
