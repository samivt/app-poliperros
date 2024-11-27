import Swal from "sweetalert2";

// Mensaje de éxito
export const showSuccessAlert = (message, title = "¡Éxito!") => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// Mensaje de error
export const showErrorAlert = (message, title = "Error") => {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    //timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

// Mensaje de advertencia (warning)
export const showWarningAlert = (message, title = "Advertencia") => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: message,
    showConfirmButton: true,
  });
};

// Confirmación con opciones
export const showConfirmationAlert = async (
  message,
  title = "¿Estás seguro?"
) => {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed; // Devuelve true si se confirma, false si se cancela
};
