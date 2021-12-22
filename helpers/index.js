import Swal from 'sweetalert2';

export const toAbsoluteUrl = (pathname) =>
  process.env.PUBLIC_URL + '/svg/' + pathname;

export const formatDate = (d) => {
  const date = new Date(d);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export function isEmpty(val) {
  return val.trim().length === 0;
}

export const ErrorHandler = (error) => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.errors) {
        return error?.response?.data
          ? Object.entries(error?.response?.data?.errors)[0][1]?.toString()
          : null;
      } else if (error.response.data.Message) {
        return error.response.data.Message;
      } else {
        return 'Server Error';
      }
    }
  }
};

export const exceptionToErrors = (error) => {
  let response = {};

  if (Array.isArray(error.errors)) {
    const { errors } = error;

    response = errors.reduce((result, next) => {
      if (next.field in result) {
        result[next.field].push(next.message);
      } else {
        result[next.field] = [next.message]; // eslint-disable-line no-param-reassign
      }

      return result;
    }, {});
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.errors
  ) {
    // Internal API
    const { errors } = error.response.data;

    response = Object.keys(errors).reduce((result, field) => {
      result[field] = Object.values(errors[field]); // eslint-disable-line no-param-reassign

      return result;
    }, {});
  }

  return response;
};

export const ResponseHandler = (response) => {
  switch (response.status) {
    case 'info':
      return Swal.fire({
        title: 'Error!',
        text: response.message,
        icon: 'error',
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
      });
      break;
    case 'warning':
      return response.message;
      break;
    case 'success':
      return Swal.fire({
        text: response.message,
        icon: 'success',
        timerProgressBar: true,
        timer: 2000,
        allowOutsideClick: true,
        showConfirmButton: false,
      });
      break;
    case '200':
      return Swal.fire({
        text: response.message,
        icon: 'success',
        timerProgressBar: true,
        timer: 2000,
        allowOutsideClick: true,
        showConfirmButton: false,
      });
      break;
    case 'info':
      return response.message;
      break;

    default:
      break;
  }
};