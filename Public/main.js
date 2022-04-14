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

function newLocation(e){
    e.preventDefault()
    let body = {
        destination: destinationInput.value,
        date: dateInput.value,
        image: imageInput.value,
        description: textInfo.value
    }
    console.log(body)
    axios.post('http://localhost:9876/api/location', body)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

form.addEventListener('submit', newLocation)