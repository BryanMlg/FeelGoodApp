import React from 'react'
import {Row, Col} from 'react-bootstrap-v5'
import List from './list'
import Formulario from './form'
import {ContentProvider} from './context'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      <Row>
        <Col>
          <Formulario />
        </Col>
      </Row>
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </ContentProvider>
  )
}

export default usuarioPage
