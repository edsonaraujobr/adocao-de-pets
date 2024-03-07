const buttonAddPet = document.getElementsByClassName("button-add-pet")[0]
const modal = document.getElementById("modal-add-pet")
const buttonCancel = document.getElementById("button-cancel")
const buttonSend = document.getElementById("button-send")

buttonAddPet.addEventListener('click', () => {
    modal.showModal()
    document.body.style.overflow = 'hidden' /*bloquear o scroll */
})

buttonCancel.addEventListener('click', () => {
    modal.close()
    document.body.style.overflow = ''
})

// prevenir o recarregamento mas ainda usar as verificações default do forms.
buttonSend.addEventListener('click', (e) => {
    const race = document.getElementById("irace")
    const size = document.getElementById("isize")
    const state = document.getElementById("istate")
    const city = document.getElementById("icity")
    const photo = document.getElementById("iphoto").files[0]
    const gender = document.querySelectorAll('input[name="gender"]')
    if(race.value != '' && size.value != '' && state.value != '' && city.value != '' && gender.value != '' && photo.value != '') {
        e.preventDefault()
        modal.close()
        document.body.style.overflow = ''

        let genderSelected

        gender.forEach(radio => {
            if (radio.checked) {
                genderSelected = radio.value
            }
         })

        const reader = new FileReader(); 

        reader.onload = function(event) {
            const photoURL = event.target.result; 
            addNewPet(race.value, genderSelected, size.value, state.value, city.value, photoURL); 
        };

        reader.readAsDataURL(photo); 


    }   
})

/* ___________________________________________________________________ */

var petAvailable = []
const sectionPets = document.getElementsByClassName("pets")[0]
const filter = document.getElementsByClassName("filter")[0]

class Pet {
    constructor(race, gender, size, state, city, photo) {
        this.race = race;
        this.gender = gender;
        this.size = size;
        this.state = state;
        this.city = city;
        this.photo = photo;
    }
}

function addNewPet (race,gender,size,state,city, photo) {
    petAvailable.push( new Pet(race,gender,size,state,city, photo) )
    createNewCard()
}

window.onload = () => {
    if (localStorage.length > 0 ) {
        filter.style.display = 'block'

        for (var i = 0; i < localStorage.length; i++) {
            let chave = localStorage.key(i)
            let petsAdded = localStorage.getItem(chave)
    
            let pet = JSON.parse(petsAdded)

            createElementsCard(pet, i)
        }
    }
    
}

function createElementsCard(lastPetAdded, id) {
    let div = document.createElement("div")
    div.classList.add("card")
    
    const race = document.createElement("span")
    race.innerHTML = lastPetAdded.race

    const gender = document.createElement("span")
    gender.innerHTML = lastPetAdded.gender

    const size = document.createElement("span")
    size.innerHTML = lastPetAdded.size

    const state = document.createElement("span")
    state.innerHTML = lastPetAdded.state

    const city = document.createElement("span")
    city.innerHTML = lastPetAdded.city

    const image = document.createElement("img");
    image.src = lastPetAdded.photo; 
    image.style.maxWidth = '250px'
    image.style.maxHeight = '100px'

    const button = document.createElement("button")
    button.innerHTML = 'Quero Adotar'
    button.classList.add("buttonAdote")

    button.addEventListener('click', function() {
        wantAdopt(div, id)
    })

    sectionPets.appendChild(div)
    div.appendChild(image)
    div.appendChild(race)
    div.appendChild(gender)
    div.appendChild(size)
    div.appendChild(state)
    div.appendChild(city)
    div.appendChild(button)
}

function wantAdopt(div,id) {
    localStorage.removeItem(id)
    sectionPets.removeChild(div)
}

function createNewCard () {

    filter.style.display = 'block'
    let lastPetAdded = petAvailable[petAvailable.length - 1]
    let id = petAvailable.length-1

    localStorage.setItem(id, JSON.stringify(lastPetAdded))
    createElementsCard(lastPetAdded, id)
}

