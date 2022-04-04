const rate = document.querySelector('#rate');
const quantity = document.querySelector('#quantity');
const amount = document.querySelector('#amount');
const options = document.querySelector('#options');
const customers = document.querySelector('#customers');
const customerDocument = document.querySelector('#customerDocument');
const products = document.querySelector('#products');

function getSelectedText(elementId) {
  var elt = document.getElementById(elementId);

  if (elt.selectedIndex == -1)
      return null;

  return elt.options[elt.selectedIndex].text;
}

console.log(getSelectedText('options'));

rate.addEventListener('change', (e) => {
  console.log('Rate is changing');
  amount.value = parseFloat(rate.value) * parseFloat(quantity.value);
});

quantity.addEventListener('change', (e) => {
  console.log('Quantity is Changing');
  amount.value = parseFloat(rate.value) * parseFloat(quantity.value);
})

options.addEventListener('change', (e) => {
  const price = parseFloat(e.target.value);
  rate.value = price;
  products.value = getSelectedText('options');
})

customers.addEventListener('change', (e) => {

  console.log(e.target.value);
  console.log(getSelectedText('customers'));
  customerDocument.value = getSelectedText('customers');
})

amount.addEventListener('change', (e) => {
  console.log('Amount is changed');
  const enteredRate = parseFloat(rate.value);
  const amount = parseFloat(e.target.value);
  const totalQuantity = (amount / enteredRate).toFixed(2);

  quantity.value = totalQuantity;

})