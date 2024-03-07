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
    const gender = document.getElementsByName("gender")[0]
    if(race.value != '' && size.value != '' && state.value != '' && city.value != '' && gender.value != '' && photo.value != '') {
        e.preventDefault()
        modal.close()
        document.body.style.overflow = ''

        const reader = new FileReader(); 

        reader.onload = function(event) {
            const photoURL = event.target.result; 
            addNewPet(race.value, gender.value, size.value, state.value, city.value, photoURL); 
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
    console.log(localStorage.length)
    if (localStorage.length > 0 ) {
        filter.style.display = 'block'
        
    }
    for (var i = 0; i <= localStorage.length; i++) {
        let chave = localStorage.key(i)
        let petsAdded = localStorage.getItem(chave)

        let pet = JSON.parse(petsAdded)
        let div = document.createElement("div")
        div.classList.add("card")
    
        const race = document.createElement("span")
        race.innerHTML = pet.race
    
        const gender = document.createElement("span")
        gender.innerHTML = pet.gender
    
        const size = document.createElement("span")
        size.innerHTML = pet.size
    
        const state = document.createElement("span")
        state.innerHTML = pet.state
    
        const city = document.createElement("span")
        city.innerHTML = pet.city
    
        const image = document.createElement("img");
        image.src = pet.photo; // Use a URL da foto diretamente
        image.style.maxWidth = '250px'
        image.style.maxHeight = '180px'
    
    
        sectionPets.appendChild(div)
        div.appendChild(image)
        div.appendChild(race)
        div.appendChild(gender)
        div.appendChild(size)
        div.appendChild(state)
        div.appendChild(city)
    }
}


function createNewCard () {

    filter.style.display = 'block'
    let lastPetAdded = petAvailable[petAvailable.length - 1]

    localStorage.setItem(`Pet${petAvailable.length-1}`,JSON.stringify(lastPetAdded))

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
    image.src = lastPetAdded.photo; // Use a URL da foto diretamente
    image.style.maxWidth = '250px'
    image.style.maxHeight = '180px'

    sectionPets.appendChild(div)
    div.appendChild(image)
    div.appendChild(race)
    div.appendChild(gender)
    div.appendChild(size)
    div.appendChild(state)
    div.appendChild(city)


}

