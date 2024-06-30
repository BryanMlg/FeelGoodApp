import {createContext, useState} from 'react'

interface ContentContextType {
  toggleModal: (data: number) => void
  show: boolean
}

export const ContentContext = createContext<ContentContextType>({} as ContentContextType)

export const ContentProvider: React.FC = ({children}) => {
  const [show, setShow] = useState<boolean>(false)

  const toggleModal = (data?: number) => {
    setShow(!show)
  }

  const value: any = {
    toggleModal,
    show,
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
