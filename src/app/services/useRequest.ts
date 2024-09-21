type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface RequestOptions {
  url: string
  method: HttpMethod
  body?: any
  headers?: HeadersInit
}

interface FetchState<T> {
  data: T | null
  error: string | null
  loading: boolean
  status: number | null   // Código de estado HTTP
  code: string | null     // Código de error específico de la API
}

export async function fetchData<T = any>({
  url,
  method,
  body = null,
  headers = {},
}: RequestOptions): Promise<FetchState<T>> {
  let data: T | null = null
  let error: string | null = null
  let loading: boolean = true
  let status: number | null = null
  let code: string | null = null // Inicialización del código de error como string

  try {
    const options: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body && method.toUpperCase() !== 'GET') {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    status = response.status // Guarda el código de estado HTTP

    const responseData = await response.json()

    // Si el código de estado no es exitoso (no está en el rango 2xx)
    if (!response.ok) {
      code = responseData?.code || null // Guarda el código de error específico si existe
      error = responseData?.message || 'Error desconocido' // Puedes cambiar a responseData.message si la API lo proporciona
    } else {
      // Si la respuesta es exitosa, guarda los datos
      data = responseData
    }
  } catch (err) {
    error = (err instanceof Error) ? err.message : 'Error desconocido'
  } finally {
    loading = false
  }

  return { data, error, loading, status, code }
}
