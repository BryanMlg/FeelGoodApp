import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'
import {createClient} from '@supabase/supabase-js'
import {fetchData} from '../../../services/useRequest'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPA_BASE_URL || '',
  process.env.REACT_APP_SUPA_BASE_KEY || ''
)

export async function loginWithSupabase(email: string, password: string) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error en el login:', error.message)
    return {error: error.message} // Retorna un objeto con el error
  }

  if (data.session) {
    const result = await fetchData<any>({
      url: `${process.env.REACT_APP_SUPA_BASE_URL}/rest/v1/persona?email=eq.${email}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.session?.access_token}`,
        apikey: `${process.env.REACT_APP_SUPA_BASE_KEY}`,
      },
    })
    return {session: data.session, dataUser: result?.data[0]}
  } else {
    return {error: 'No se obtuvo una sesión válida'} // Manejo de casos sin sesión
  }
}

export async function signUp(email: string, password: string) {
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error creating user:', error.message)
  } else {
    console.log('User created:', data)
  }
}

export const sendPasswordResetEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    localStorage.setItem('passwordResetError', 'true');
    window.location.href = '/reset/email-error';
  } else {
    localStorage.removeItem('passwordResetError');
    window.location.href = '/reset/email';
  }
}


// Server should return AuthModel - Local
// export function login(email: string, password: string) {
//   return axios.post(LOGIN_URL, {email, password})
// }

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}
