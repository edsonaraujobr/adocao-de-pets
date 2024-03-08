const buttonAddPet = document.getElementsByClassName("button-add-pet")[0]
const modal = document.getElementById("modal-add-pet")
const buttonCancel = document.getElementById("button-cancel")
const buttonSave = document.getElementById("button-send")
const buttonEdit = document.getElementById("button-edit")

buttonAddPet.addEventListener('click', () => {
    cleanInputs()
    modal.showModal()
    document.body.style.overflow = 'hidden' /*bloquear o scroll */
})

function cleanInputs() {
    const race = document.getElementById("irace")
    const size = document.getElementById("isize")
    const state = document.getElementById("istate")
    const city = document.getElementById("icity")
    const photo = document.getElementById("iphoto")
    const gender = document.querySelectorAll('input[name="gender"]')

    race.value = ''
    size.value = ''
    state.value = ''
    city.value = ''
    photo.value = ''

    gender.forEach(radio => {
        radio.checked = false
    })
}

buttonCancel.addEventListener('click', () => {
    modal.close()
    cleanInputs()
    document.body.style.overflow = ''
    buttonEdit.style.display = 'none'
    buttonSave.style.display = 'block'
})

// prevenir o recarregamento mas ainda usar as verificações default do forms.
buttonSave.addEventListener('click', (e) => {
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

const sectionPets = document.getElementsByClassName("pets")[0]
const filter = document.getElementsByClassName("filter")[0]
var petAvailable = []

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

function addNewPet (race, gender, size, state, city, photo) {
    const newPet = new Pet(race, gender, size, state, city, photo)
    petAvailable.push( newPet )

    createNewCard(newPet)
    localStorage.setItem("petAvailable", JSON.stringify(petAvailable)) /* salva o array no storage do navegador */
}

function createNewCard (newPet) {
    filter.style.display = 'block'
    createElementsCard(newPet)
}

function createElementsCard(newPet) {

    let div = document.createElement("div")
    div.classList.add("card")
    
    const ElementRace = document.createElement("span")
    ElementRace.innerHTML = newPet.race

    const ElementGender = document.createElement("span")
    ElementGender.innerHTML = newPet.gender

    const ElementSize = document.createElement("span")
    ElementSize.innerHTML = newPet.size

    const ElementState = document.createElement("span")
    ElementState.innerHTML = newPet.state

    const ElementCity = document.createElement("span")
    ElementCity.innerHTML = newPet.city

    const ElementImage = document.createElement("img");
    ElementImage.src = newPet.photo; 
    ElementImage.style.maxWidth = '250px'
    ElementImage.style.maxHeight = '100px'

    const divButtons = document.createElement("div")
    divButtons.classList.add("card-button")

    const buttonWantAdopt = document.createElement("button")
    buttonWantAdopt.innerHTML = 'Quero Adotar'
    buttonWantAdopt.classList.add("buttonAdote")

    buttonWantAdopt.addEventListener('click', function() {
        wantAdopt(div, newPet)
    })

    const buttonSetPet = document.createElement("button")
    buttonSetPet.innerHTML = 'Editar'
    buttonSetPet.classList.add("button-setUp")  

    buttonSetPet.addEventListener('click', function () {
        setup(ElementRace, ElementGender, ElementSize, ElementState, ElementCity, ElementImage, newPet)
    })

    divButtons.appendChild(buttonSetPet)
    divButtons.appendChild(buttonWantAdopt)
    
    sectionPets.appendChild(div)
    div.appendChild(ElementImage)
    div.appendChild(ElementRace)
    div.appendChild(ElementGender)
    div.appendChild(ElementSize)
    div.appendChild(ElementState)
    div.appendChild(ElementCity)
    div.appendChild(divButtons)
}

function wantAdopt(div, petAdopt) {
    getArrayPet = localStorage.getItem("petAvailable")
    arrayPet = JSON.parse(getArrayPet)

    const indexToRemove = arrayPet.findIndex(pet => {
        return pet.race ===  petAdopt.race && pet.gender === petAdopt.gender && pet.size === petAdopt.size &&
        pet.state === petAdopt.state && pet.city === petAdopt.city
    })

    petAvailable.splice(indexToRemove, 1) 
    localStorage.setItem("petAvailable", JSON.stringify(petAvailable)); // atualiza o local storage
    sectionPets.removeChild(div)
}

// console.log(petAvailable.findIndex(1))

function setup(ElementRace, ElementGender, ElementSize, ElementState, ElementCity, ElementImage, newPet) {

    const thisElementRace = document.getElementById("irace")
    const thisElementSize = document.getElementById("isize")
    const thisElementState = document.getElementById("istate")
    const thisElementCity = document.getElementById("icity")
    const thisElementPhoto = document.getElementById("iphoto")
    const thisElementGender = document.querySelectorAll('input[name="gender"]')

    for (let i = 0; i < thisElementSize.options.length; i++) {
        if (thisElementSize.options[i].value === newPet.size) {
            thisElementSize.options[i].selected = true
            break;
        } 
    }

    thisElementRace.value = newPet.race
    thisElementState.value = newPet.state
    thisElementCity.value = newPet.city
    // photo.value = pet.photo

    thisElementGender.forEach(radio => {
        if(radio.value === newPet.gender) {
            radio.checked = true
        }
    })

    document.body.style.overflow = 'hidden'
    buttonEdit.style.display = 'block'

    buttonEdit.addEventListener('click', function (e) {
        
        thisElementGender.forEach(radio => {
            if (radio.checked) {
                thisElementGender.value = radio.value
            }
        })

        ElementRace.innerHTML = thisElementRace.value
        ElementGender.innerHTML = thisElementGender.value
        ElementSize.innerHTML = thisElementSize.value
        ElementState.innerHTML = thisElementState.value
        ElementCity.innerHTML = thisElementCity.value

        ElementRace.value = thisElementRace.value
        ElementGender.value = thisElementGender.value
        ElementSize.value = thisElementSize.value
        ElementState.value = thisElementState.value
        ElementCity.value = thisElementCity.value

        newPet.race = ElementRace.value
        newPet.size = ElementSize.value
        newPet.state = ElementState.value
        newPet.city = ElementCity.value
        
        localStorage.setItem("petAvailable", JSON.stringify(petAvailable)) /* salva o array no storage do navegador */

        e.preventDefault()
        modal.close()
        document.body.style.overflow = ''
        buttonEdit.style.display = 'none'
        buttonSave.style.display = 'block'
    })

    buttonSave.style.display = 'none'
    modal.showModal()

}


window.onload = () => {
    
    if (localStorage.getItem("petAvailable")) {
        filter.style.display = 'block'

        /* recuperar os pets salvos no navegador */
        const amountPet = localStorage.getItem("petAvailable")
        var arrayPet = JSON.parse(amountPet) 

        for (var i = 0; i < arrayPet.length; i++) {

            createElementsCard(arrayPet[i])

            /* enviar para o array novamente, pois ele esta vazio após recarregar */
            petAvailable.push( new Pet(arrayPet[i].race,arrayPet[i].gender,arrayPet[i].size,arrayPet[i].state,arrayPet[i].city, arrayPet[i].photo) )

        }
    }
    
}

