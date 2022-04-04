const slip = document.querySelector('#slip');
const vehicleP = document.querySelector('#vehicles');
const customersP = document.querySelector('#customers');
const entryNew = document.querySelector('#entryNew');

let slips;
let vehicles;

const getSlips = async () => {

  fetch('http://localhost:3000/slips').then(data => {
    return data.json();
  })
  .then(data => {
    console.log(data);
    slips = data;
  })
  .catch(err => {
    console.log(err);
  })
}

const getVehicles = async () => {

  fetch('http://localhost:3000/vehicles').then(data => {
    return data.json();
  })
  .then(data => {
    console.log(data);
    vehicles = data;
  })
  .catch(err => {
    console.log(err);
  })
}

getSlips();
getVehicles();

slip.addEventListener('keyup', (e) => {

  const index = slips.indexOf(e.target.value);
  if(index >= 0) {
    alert('Slip No already exists');
  }

})

customersP.addEventListener('change', (e) => {

  let i; 
  let L = vehicleP.options.length - 1;
   for(i = L; i >= 0; i--) {
    vehicleP.remove(i);
   }

   let count = 0;

  const customer_id = e.target.value;
  vehicles.forEach(vehicle => {
    if(vehicle.customer_id === customer_id) {
      console.log(vehicle);
      const option = document.createElement('option');
      option.innerText = vehicle.vehicle_no;
      option.vehicle_no = vehicle.vehicle_no;
      vehicleP.append(option);
      count++;

    }
  })

  if(count === 0) {
    const option = document.createElement('option');
    option.innerText = 'None';
    option.value = 'None';
    vehicleP.append(option);
  }

})

entryNew.addEventListener('submit', (e) => {

  const slip = entryNew.slip.value;
  const index = slips.indexOf(slip);

  if(index >= 0) {
    e.preventDefault();
    alert('Slip No. is already used');
  }

})