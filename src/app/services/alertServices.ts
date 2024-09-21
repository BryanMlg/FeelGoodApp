// src/services/alertService.ts
import Swal from 'sweetalert2'

// Tipos para los parámetros
type AlertType = 'success' | 'error' | 'info'
type ToastPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top-right'

// Función principal para mostrar la alerta
const showAlert = (type: AlertType, title: string, text: string, timer: number = 1500) => {
  Swal.fire({
    title,
    text,
    icon: type,
    timer,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    didClose: () => {
      Swal.close()
    },
  })
}

// Función para mostrar un "toast" de notificación con posición personalizada
const showToast = (
  type: AlertType,
  title: string,
  text: string,
  position: ToastPosition = 'top-right'
) => {
  const Toast = Swal.mixin({
    toast: true,
    position, // Usar el parámetro de posición
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  Toast.fire({
    icon: type,
    title,
    text,
  })
}

// Función para manejar alertas según el valor numérico
const showNotification = (
  status: number,
  title: string,
  text: string = '',
  timer?: number,
  position?: ToastPosition
) => {
  switch (status) {
    case 1: // Success
      showAlert('success', title, text, timer)
      break
    case 0: // Error
      showAlert('error', title, text, timer)
      break
    case 3: // Toast notification success
      showToast('success', title, text, position)
      break
    case 4: // Toast notification error
      showToast('error', title, text, position)
      break
    case 5: // Toast notification info
      showToast('info', title, text, position)
      break
    default:
      console.error('Invalid status type')
  }
}

const showLoadingToast = (text: string, position: ToastPosition = 'top-right') => {
  showToast('info', 'Cargando...', text, position) // `true` para mostrar que está cargando
}
const closeToast = () => {
  Swal.close() // Cerrar el toast cuando sea necesario
}

export {showNotification, closeToast, showLoadingToast}
