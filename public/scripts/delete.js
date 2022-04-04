const deletion = document.querySelector('#Deletion');

deletion.addEventListener('submit', e => {

  const value = prompt('Do you want to delete (y/n) ??');

  if(!(value === 'y')) {
    e.preventDefault();
  }

});


window.history.pushState({page: 1}, "", "");

window.onpopstate = function(event) {
    if(event){
        window.location.href = 'http://localhost:3000/customers';
        // Code to handle back button or prevent from navigation
    }
}
