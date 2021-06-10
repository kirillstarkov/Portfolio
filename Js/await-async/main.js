const url = 'https://jsonplaceholder.typicode.com/';
const photoUrl = 'photos';
let photoHistory = [];

let photContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let send = document.querySelector('#send');
let add = document.querySelector('#add');
let photoInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
send.addEventListener('click', function() {
    let id = photoInput.value;
    sendData(id);
});

photoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main();
    } else {
        event.preventDefault();
    }
});

async function main() {
    let img = new Image ();
    let id = photoInput.value;
    if(!id) {
        throw new Error('Enter ID please');
    } else {
        photoInput.disabled = true;
        try{ 
            let response = await fetch(`${url}${photoUrl}/${id}`);
            if (response.status == 200){
                let data = await response.json();
                img.src = data.url;
                await photContainer.append(img);
                await photoHistory.push(data);
                await toastr.success('Success!')
            } else if(response.status == 404) {
                throw new Error('Image not found');
            }
            photoInput.disabled = await false;
            await photoInput.focus();

        } catch(err){
            console.log(err);
            toastr.err(err.message, err.name);
        }
    }
      
}
