import React from 'react'
import {Toolbar3} from '../../../../_metronic/layout/components/toolbar/Toolbar3'
import {Row, Col} from 'react-bootstrap-v5'
import List from './list'
import Formulario from './form'
import {ContentProvider} from './context'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      <Toolbar3 DefaultTitle={'Registro Sintomas'} pageModal={<Formulario />} />
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </ContentProvider>
  )
}

export default usuarioPage
