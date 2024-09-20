import React from 'react'
import {ContentProvider} from './context'
import List from './list'
const usuarioPage: React.FC = () => {
  return (
    <ContentProvider>
      <List/>
    </ContentProvider>
  )
}

export default usuarioPage