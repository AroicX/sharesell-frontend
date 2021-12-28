import Swal from 'sweetalert2';
import States from '@/helpers/states.json';

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

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const selectFilter = (data, id, name) => {
  let result = [];
  data.map((item) => {
    result.push({ id: item[id], name: item[name] });
  });
  return result;
};

export const selectValue = (data, id, name, value) => {
  let request = data.filter((item) => item[id] === value)[0];
  if (request) {
    console.log(request[name]);
    return request[name];
  }
};

export const inputFormatter = (amount, seperator, afterNumber) => {
  let allNumbers = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  let incomingAmount = amount.toString();
  const amountInArray = [];
  for (let i = 0; i < incomingAmount.length; i++) {
    if (incomingAmount[i] !== seperator && allNumbers[incomingAmount[i]]) {
      amountInArray.push(incomingAmount[i]);
    }
  }
  let numOfDecimal = 0;
  if (amountInArray.length % afterNumber == 0) {
    numOfDecimal = amountInArray.length / afterNumber - 1;
  } else {
    numOfDecimal = Math.floor(amountInArray.length / afterNumber);
  }

  if (numOfDecimal < 1) {
    let lessDecimal = '';
    for (let i = 0; i < amountInArray.length; i++) {
      lessDecimal = lessDecimal + amountInArray[i];
    }
    return lessDecimal;
  }

  const indexArray = indexDeterminer(
    amountInArray.length,
    numOfDecimal,
    afterNumber
  );
  let formattedAmount = '';
  let nextIndexPointer = 0;
  for (let i = 0; i < amountInArray.length; i++) {
    if (i === indexArray[nextIndexPointer]) {
      formattedAmount = `${formattedAmount}${amountInArray[i]}${seperator}`;
      nextIndexPointer = nextIndexPointer + 1;
      if (nextIndexPointer >= indexArray.length) {
        nextIndexPointer = nextIndexPointer - 1;
      }
    } else {
      formattedAmount = `${formattedAmount}${amountInArray[i]}`;
    }
  }
  return formattedAmount;
};

const indexDeterminer = (amountLength, numOfDecimal, afterNumber) => {
  const indexesArray = [];
  let nextComma = amountLength;
  for (let i = 0; i < numOfDecimal; i++) {
    indexesArray.push(nextComma - (afterNumber + 1));
    nextComma = nextComma - afterNumber;
  }
  indexesArray.reverse();
  return indexesArray;
};

export const getStates = () => {
  return States.map((state, index) => {
    return { name: state.state, id: index };
  });
};

export const getCity = (state) => {
  let cities = [];
  for (let i = 0; i < States.length; i++) {
    if (States[i].state === state) {
      let lgas = States[i].lgas;
      cities = lgas.map((lga, index) => {
        return { id: index, name: lga };
      });
      break;
    }
  }
  return cities;
};

export const validateEmail = (email) => {
  let mailFormatter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailFormatter)) {
    return true;
  } else {
    return false;
  }
};

export const nameSplit = (name, index) => {
  let splittedName = name.split(' ');
  return splittedName[index];
};

export const inputValidatorChecker = (value) => {
  if (value === '') {
    return false;
  } else {
    return true;
  }
};

export const inputValidatorErrorState = (value,errorState, errMsg) => {
  if(value === ""){
    errorState(errMsg);
    return ;
  }
};

export const cardDetailsFormatter = (value) => {
  const valueArray = [];
  let allNumbers = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };

  for (let i = 0; i < value.length; i++) {
    if (valueArray[i] !== '-' && allNumbers[value[i]]) {
      valueArray.push(value[i]);
    }
  }
};
