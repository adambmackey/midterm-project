//fist get the form using query selector to get elements using id's assign to variables get the form
//then assign event listener and event listener will fire the handler function
// event.preventDefault() first thing in function

// const { default: axios } = require("axios")

//create a new element
const form = document.querySelector('#myForm')
const destinationInput = document.querySelector('#destination')
const dateInput = document.querySelector('#date')
const imageInput = document.querySelector('#img')
const textInfo = document.querySelector('#sum')
const displayContainer = document.querySelector('#cardDisplay')

function newLocation(e){
    e.preventDefault()
    let body = {
        destination: destinationInput.value,
        date: dateInput.value,
        image: imageInput.value,
        description: textInfo.value
    }
    // console.log(body)
    axios.post('http://localhost:9876/api/location', body)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

function getLocation() {
   
    axios.get('http://localhost:9876/api/location')
    .then(res => {
        console.log(res.data);
        res.data.map(result => {
        let displayDiv = document.createElement("div");
        displayDiv.classList.add("card");
        displayDiv.style.width = "18rem";
        let placeHolderImg = './No-Image-Placeholder.svg.png'
        let displayImg = result.image ? result.image : placeHolderImg
        displayDiv.innerHTML = `
            <img src='${displayImg}' class="card-img-top" alt="...">
            <div class='card-body bg-light '>
            <h3 class='card-title'>${result.destination}</h3>
            <p class='card-text overflow-hidden'>${result.description}</p>
            </div>  `;
        displayContainer.appendChild(displayDiv);
        })
    })
    .catch(err => console.log(err))
}

form.addEventListener('submit', newLocation)
getLocation()