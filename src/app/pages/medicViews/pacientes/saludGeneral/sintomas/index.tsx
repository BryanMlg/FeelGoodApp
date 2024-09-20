import React from 'react'
// import Formulario from './form'
import {ContentProvider} from './context'
import List from './list'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      {/* <Formulario/> */}
      <List/>
    </ContentProvider>
  )
}

export default usuarioPage
