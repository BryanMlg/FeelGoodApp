import React from 'react'
import {Toolbar3} from '../../../../_metronic/layout/components/toolbar/Toolbar3'
import MyCalendar from './calendar'
import Formulario from './form'
import {ContentProvider} from './context'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      <Toolbar3 DefaultTitle={'Registro Diario'}/>
      <MyCalendar/>
      <Formulario/>
    </ContentProvider>
  )
}

export default usuarioPage
