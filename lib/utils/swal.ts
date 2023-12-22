import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  timerProgressBar: true,
  position: "top",
  showConfirmButton: false,
  width: "max-content",
  padding: 8,
});
