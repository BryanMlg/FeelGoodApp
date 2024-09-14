import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

// export interface UserModel {
//   id: number
//   username: string
//   password: string | undefined
//   email: string
//   firstname: string
//   lastname: string
//   fullname?: string
//   occupation?: string
//   companyName?: string
//   phone?: string
//   roles?: Array<number>
//   pic?: string
//   language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
//   timeZone?: string
//   website?: 'https://keenthemes.com'
//   emailSettings?: UserEmailSettingsModel
//   auth?: AuthModel
//   communication?: UserCommunicationModel
//   address?: UserAddressModel
//   socialNetworks?: UserSocialNetworksModel
// }
export interface UserModel {
  id: number
  created_at: Date
  primerNombres: string
  segundoNombre?: string
  tercerNombre?: string
  primerApellido: string
  segundoApellido?: string
  dpi: string
  edad: number
  fechaNacimiento: Date
  rolId: number
  municipioId: number
  departamentoId: number
  creadoPor?: string
  actualizado?: Date
  actualizadoPor?: string
  estado: boolean
  email: string
}

