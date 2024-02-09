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

export const Confirm = Swal.mixin({
  icon: "question",
  titleText: "Yakin Bre?",
  // text: "Pastikan ",
  confirmButtonText: "Ya, Yakin",
  showCancelButton: true,
  cancelButtonText: "Jangan Deh",
  focusConfirm: false,
  focusCancel: true,
});
