function base64UrlDecode(base64Url: string): string {
    // Reemplazar caracteres no estándar de Base64Url con caracteres de Base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Añadir relleno de Base64 si es necesario
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }
    // Decodificar Base64 a una cadena UTF-8
    return atob(base64);
  }

  // Decodifica el JWT
  export function decodeJWT(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT');
    }

    // Decodificar la parte del payload
    const payload = parts[1];
    const decodedPayload = base64UrlDecode(payload);

    // Parsear el JSON decodificado
    return JSON.parse(decodedPayload);
  }