// src/services/alertService.ts
import Swal from 'sweetalert2';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

const showAlert = (type: AlertType, title: string, text: string, timer: number = 1500) => {
  Swal.fire({
    title,
    text,
    icon: type,
    timer, // Tiempo en milisegundos para mostrar la alerta antes de cerrarse automáticamente
    showConfirmButton: true, // Ocultar el botón de "Aceptar"
    confirmButtonText: 'Aceptar',
    
    didClose: () => {
      Swal.close(); // Cerrar la alerta después del tiempo especificado
    }
  });
};

const showSuccessAlert = (title: string, text: string, timer?: number) => {
  showAlert('success', title, text, timer);
};

const showErrorAlert = (title: string, text: string, timer?: number) => {
  showAlert('error', title, text, timer);
};

export { showSuccessAlert, showErrorAlert };
