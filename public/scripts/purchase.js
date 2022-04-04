const customers = document.querySelector('#customers');
const customerName = document.querySelector('#customerDocument');


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
