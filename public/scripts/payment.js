const customers = document.querySelector('#customers');
const customerName = document.querySelector('#customerDocument');

const banks = document.querySelector('#bank');
const bankName = document.querySelector('#bankDocument');

console.log('Hello World');

function getSelectedText(elementId) {
  var elt = document.getElementById(elementId);

  if (elt.selectedIndex == -1)
      return null;

  return elt.options[elt.selectedIndex].text;
}

customers.addEventListener('change', (e) => {

  customerName.value = getSelectedText('customers');

})

banks.addEventListener('change', (e) => {

  bankName.value = getSelectedText('bank');

})