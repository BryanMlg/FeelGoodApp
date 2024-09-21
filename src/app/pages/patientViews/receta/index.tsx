import React from 'react'
import {Toolbar3} from '../../../../_metronic/layout/components/toolbar/Toolbar3'
import {Row, Col} from 'react-bootstrap-v5'
import List from './list'
import {ContentProvider} from './context'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      <Toolbar3 DefaultTitle={'Mis Recetas'} />
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </ContentProvider>
  )
}

export default usuarioPage
