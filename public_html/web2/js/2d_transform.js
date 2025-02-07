// 2d_transform.js

console.log('2d_transform.js loaded');

//create a selector
let bear3 = document.querySelector("#bear3");

bear3.addEventListener('click', function (event) {
    //console.log(this.id);
    this.classList.toggle('move-right')
})