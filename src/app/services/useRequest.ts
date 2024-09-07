type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface RequestOptions {
  url: string
  method: HttpMethod
  body?: any
  headers?: HeadersInit
}

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: number | null; // Añadido para el código de estado HTTP
}

export async function fetchData<T = any>({
  url,
  method,
  body = null,
  headers = {},
}: RequestOptions): Promise<FetchState<T>> {
  let data: T | null = null;
  let error: string | null = null;
  let loading: boolean = true;
  let status: number | null = null; // Añadido para el código de estado HTTP

  try {
    const options: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body && method.toUpperCase() !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    status = response.status; // Guarda el código de estado

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    data = await response.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
  } finally {
    loading = false;
  }

  return { data, error, loading, status };
}
