console.log('Hello World');

const dateElement = document.querySelector('#date');

const date = new Date();

const month = date.getMonth() + 1;
const year = date.getFullYear();
const day = date.getDate();

let today;

if(day < 10 && month < 10) {
  today = year + '-' + '0' + month + '-' + '0' + day;
} else if (day < 10) {
  today = year + '-' + month + '-' + '0' + day;
} else if (month < 10) {
  today = year + '-' + '0' + month + '-' + day;
}

dateElement.value = today;
