import {createContext, useState} from 'react'

interface ContentContextType {
  toggleModal: (data: number) => void
  show: boolean
  enfermedades: Array<any>
}

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const [show, setShow] = useState<boolean>(false)

  const toggleModal = (data?: number) => {
    setShow(!show)
  }

  const enfermedades = [{value: 'Cancer', label: 'Cancer'}]

  const value: any = {
    toggleModal,
    show,
    enfermedades,
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
