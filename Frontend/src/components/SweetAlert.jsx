import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// eslint-disable-next-line react/prop-types
const SweetAlert = ({ type, title, text, show, onConfirm }) => {
  useEffect(() => {
    if (show) {
      const Toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      switch (type) {
        case 'success':
          Toast.fire({
            icon: 'success',
            title: title || 'Success!',
            text: text
          });
          break;
        case 'error':
          Toast.fire({
            icon: 'error',
            title: title || 'Error!',
            text: text
          });
          break;
        case 'warning':
          Toast.fire({
            icon: 'warning',
            title: title || 'Warning!',
            text: text
          });
          break;
        case 'info':
          Toast.fire({
            icon: 'info',
            title: title || 'Info',
            text: text
          });
          break;
        case 'confirm':
          MySwal.fire({
            title: title || 'Are you sure?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed && onConfirm) {
              onConfirm();
            }
          });
          break;
        default:
          Toast.fire({
            icon: 'info',
            title: title,
            text: text
          });
      }
    }
  }, [show, type, title, text, onConfirm]);

  return null;
};

export default SweetAlert;  
export { MySwal as SweetAlertInstance };