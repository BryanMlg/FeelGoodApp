import React, {useState} from 'react'
import {Row, Col, Tabs, Tab} from 'react-bootstrap-v5'
import List from './list'
import Formulario from './form'
import Sintomas from './sintomas'
import Menopausia from './menopausia'
import Receta from './receta'
import Enfermedad from './enfermedad'
import {ContentProvider} from './context'

const UsuarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('salud-general')

  return (
    <ContentProvider>
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || 'salud-general')}
        className='mb-3'
      >
        <Tab eventKey='salud-general' title='Salud General'>
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
        </Tab>

        <Tab eventKey='registro-diario' title='Registro Diario'>
          <Row className='mt-4'>
            <Col>
              <Sintomas />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey='menopausia' title='Etapa Menopáusica'>
          <Row className='mt-4'>
            <Col>
              <Menopausia />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey='receta' title='Recetas'>
          <Row className='mt-4'>
            <Col>
              <Receta />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey='enfermedad' title='Enfermedad'>
          <Row className='mt-4'>
            <Col>
              <Enfermedad />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </ContentProvider>
  )
}

export default UsuarioPage
