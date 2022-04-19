//fist get the form using query selector to get elements using id's assign to variables get the form
//then assign event listener and event listener will fire the handler function
// event.preventDefault() first thing in function

// const { default: axios } = require("axios")

// const { default: axios } = require("axios")

// const { default: axios } = require("axios")

//create a new element
const form = document.querySelector('#myForm')
const destinationInput = document.querySelector('#destination')
const dateInput = document.querySelector('#date')
const imageInput = document.querySelector('#img')
const textInfo = document.querySelector('#sum')
const displayContainer = document.querySelector('#cardDisplay')
const editForm = document.querySelector('#editForm')
let currentDestionationId = 0

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
    .then(res => getLocation())
    .catch(err => console.log(err))
}
// create function deleteTrip takes id as param. makes axios request to server side, so server can delete the object with id
function deleteTrip(id){
    axios.delete(`http://localhost:9876/api/location/${id}`)
    .then(res => location.reload())
    .catch(err => console.log(err))
}
function updateTrip(e){
    e.preventDefault()
    let updateDes = document.querySelector('#updateDes')
    let updateDate = document.querySelector('#updateDate')
    let updateImg = document.querySelector('#updateImg')
    let updateDescription = document.querySelector('#description')
    // console.log(updateDes,updateDate,updateImg, description)

    let body = {
        destination: updateDes.value,
        date: updateDate.value,
        image: updateImg.value,
        description: updateDescription.value
    }
    console.log(currentDestionationId)
    axios.put(`http://localhost:9876/api/location/${currentDestionationId}`, body)
    .then(res => location.reload())
    .catch(err => console.log(err))
}

function displayEditForm (id) {
    currentDestionationId = id
    editForm.style.display = 'block'
}

function getLocation() {
   
    axios.get('http://localhost:9876/api/location')
    .then(res => {
        console.log(res.data);
        displayContainer.innerHTML = ''
        destinationInput.value = ''
        dateInput.value = ''
        imageInput.value = ''
        textInfo.value = ''
        //in the map,create a delete button, add a even listener to that button, call a function that recieves an id as a paramater
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
            <button onclick='deleteTrip(${result.id})' class="btn btn-danger">Delete</button>
            <button onclick='displayEditForm(${result.id})' class="btn btn-success">Show edit input</button>
            </div>  `;
        displayContainer.appendChild(displayDiv);
        })
    })
    .catch(err => console.log(err))
}

form.addEventListener('submit', newLocation)
editForm.addEventListener('submit', updateTrip)
getLocation()