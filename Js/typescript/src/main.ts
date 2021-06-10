// const url = 'https://fakestoreapi.com/';
// const productsUrl = 'products';

// let photoHistory = [];

// let photContainer = document.querySelector('.photo-container');
// let request = document.querySelector('#request');
// let add = document.querySelector('#add');
// let photoInput = document.querySelector('#photoInput');

// request.addEventListener('click', main);
// photoInput.addEventListener('keyup', (event) => {
//     if (event.key === "Enter") {

//         main()
//     } else {
//         event.preventDefault()
//     }
// });

// function main() {

//     let id = photoInput.value;
//     if (!isNaN(id)) {
//         photoInput.disabled = true;

//         fetch(`${url}${productsUrl}/${id}`)
//             .then(response => {
//                 // console.log(response);
//                 return response.json();
//             })
//             .then(data => {
//                 // console.log(data);
//                 return loadImage(data);
//             })
//             .then(({
//                 image,
//                 data
//             }) => {
//                 photContainer.append(image);
//                 photoHistory.push(data);
//                 // console.log(photoHistory);
//                 photoInput.disabled = false;
//                 photoInput.focus();
//             })
//     }

// }

// function loadImage(data:any) {
//     return new Promise(function (resolve, reject) {
//         let image = new Image();
//         image.src = data.image;
//         image.onload = () => resolve({
//             image,
//             data
//         });
//         image.onerror = () => reject();
//     })
// }