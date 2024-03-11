const buttonAddPet = document.getElementsByClassName("card-add")[0]
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
    let photo = document.getElementById("iphoto")
    const gender = document.querySelectorAll('input[name="gender"]')

    // precisamos previnir tambem para caso o usuario digitar espacos vazios atrves do trim()
    if(race.value.length >= 3 && race.value.trim().length >=1 && size.value.length >= 3 && size.value.trim().length >=1 && state.value.length >= 3 && state.value.trim().length >=1 && city.value.length >= 3 && city.value.trim().length >=1 && verifyIfHasImageSelected(photo) && verifyIfHasGenderSelected(gender)) {
        e.preventDefault()

        // verifica qual genero selecionado
        let genderSelected

        gender.forEach(radio => {
            if (radio.checked) {
                genderSelected = radio.value
            }
        })

        photo = document.getElementById("iphoto").files[0]

        // transforma a foto
        const reader = new FileReader(); 

        reader.onload = function(event) { // funcao assincrona
            const photoURL = event.target.result; 

            var dados = [race.value, state.value, city.value]
            formatarDados(dados)

            race.value = dados[0]
            state.value = dados[1]
            city.value = dados[2]

            const isEquals = checkSamePet(race.value, size.value, state.value, city.value, photoURL, genderSelected)
            if (!isEquals) {
                modal.close()
                document.body.style.overflow = ''
                addNewPet(race.value, genderSelected, size.value, state.value, city.value, photoURL); 
            } else {
                modal.close()
                error()
            }
        };

        reader.readAsDataURL(photo); 
    } else if(race.value.length >= 3 && size.value.length >= 3 && state.value.length >= 3 && city.value.length >= 3 && verifyIfHasImageSelected(photo) && verifyIfHasGenderSelected(gender)) {
        e.preventDefault()
        empty()
        modal.close()
    }
})

function checkSamePet (race, size, state, city, photoURL, genderSelected) {

    // verifica se ja tem algum pet dentro do array com as mesmas caracteristicas.
    const amountPet = localStorage.getItem("petAvailable")
    var arrayPet = JSON.parse(amountPet) 
    let isEquals = false

    if (localStorage.getItem("petAvailable")) {

        arrayPet.forEach(pet => {
            if (pet.race === race && pet.size === size && pet.state === state && pet.city === city && pet.gender === genderSelected && pet.photo === photoURL) {
                isEquals =  true
            }
        })
    }
    return isEquals

}

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

function formatarDados(dados) {
    for(let i = 0 ; i < dados.length ; i++) {
        var input = dados[i].toLowerCase()
        var firstLetter = input.slice(0,1)
        firstLetter.toUpperCase()

        dados[i] = firstLetter.toUpperCase() + input.slice(1)
    }
}
function addNewPet (race, gender, size, state, city, photo) {


    const newPet = new Pet(race, gender, size, state, city, photo)
    petAvailable.push( newPet )

    createNewCard(newPet)
    localStorage.setItem("petAvailable", JSON.stringify(petAvailable)) /* salva o array no storage do navegador */
}

function createNewCard (newPet) {
    // filter.style.display = 'block'
    createElementsCard(newPet)
    sucess()
}

function createElementsCard(newPet) {

    let div = document.createElement("div")
    div.classList.add("card")
    
    let divRace = document.createElement("div")
    divRace.classList.add("flex-items-card")

    const spanRace = document.createElement("span")
    spanRace.innerHTML = newPet.race

    const iconRace = document.createElement("img")
    iconRace.src = '../assets/images/raca-icon.png'
    iconRace.classList.add("icon-card")

    divRace.appendChild(iconRace)
    divRace.appendChild(spanRace)

    let divGender = document.createElement("div")
    divGender.classList.add("flex-items-card")

    const iconGender = document.createElement("img")
    iconGender.src = '../assets/images/genero-icon.png'
    iconGender.classList.add("icon-card")

    const spanGender = document.createElement("span")
    spanGender.innerHTML = newPet.gender

    divGender.appendChild(iconGender)
    divGender.appendChild(spanGender)

    let divSize = document.createElement("div")
    divSize.classList.add("flex-items-card")

    const iconSize = document.createElement("img")
    iconSize.src = '../assets/images/tamanho-icon.png'
    iconSize.classList.add("icon-card")

    const spanSize = document.createElement("span")
    spanSize.innerHTML = newPet.size

    divSize.appendChild(iconSize)
    divSize.appendChild(spanSize)

    const iconState = document.createElement("img")
    iconState.src = '../assets/images/localizacao-icon.png'
    iconState.classList.add("icon-card")

    let divState = document.createElement("div")
    divState.classList.add("flex-items-card")

    const spanState = document.createElement("span")
    spanState.innerHTML = newPet.state

    divState.appendChild(iconState)
    divState.appendChild(spanState)

    const iconCity = document.createElement("img")
    iconCity.src = '../assets/images/localizacao-icon.png'
    iconCity.classList.add("icon-card")

    let divCity = document.createElement("div")
    divCity.classList.add("flex-items-card")

    const spanCity = document.createElement("span")
    spanCity.innerHTML = newPet.city

    divCity.appendChild(iconCity)
    divCity.appendChild(spanCity)

    const imgImage = document.createElement("img");
    imgImage.src = newPet.photo; 
    imgImage.style.maxWidth = '250px'
    imgImage.style.maxHeight = '100px'

    const divButtons = document.createElement("div")
    divButtons.classList.add("card-button")

    const buttonWantAdopt = document.createElement("button")
    buttonWantAdopt.innerHTML = 'Quero Adotar'
    buttonWantAdopt.classList.add("button-adote")

    buttonWantAdopt.addEventListener('click', function() {
        wantAdopt(div, newPet)
    })

    const buttonSetPet = document.createElement("button")
    buttonSetPet.innerHTML = 'Editar'
    buttonSetPet.classList.add("button-setup")  

    buttonSetPet.addEventListener('click', function () {
        const objectElement =  { spanRace, spanGender, spanSize, spanState, spanCity, imgImage }
        setup(objectElement, newPet)
    })

    divButtons.appendChild(buttonSetPet)
    divButtons.appendChild(buttonWantAdopt)
    
    sectionPets.appendChild(div)
    div.appendChild(imgImage)
    div.appendChild(divRace)
    div.appendChild(divGender)
    div.appendChild(divSize)
    div.appendChild(divState)
    div.appendChild(divCity)
    div.appendChild(divButtons)


}

function wantAdopt(div, petAdopt) {
    getArrayPet = localStorage.getItem("petAvailable")
    arrayPet = JSON.parse(getArrayPet)

    const indexToRemove = arrayPet.findIndex(pet => {
        return pet.race ===  petAdopt.race && pet.gender === petAdopt.gender && pet.size === petAdopt.size &&
        pet.state === petAdopt.state && pet.city === petAdopt.city && pet.photo === petAdopt.photo
    })

    petAvailable.splice(indexToRemove, 1) 

    localStorage.setItem("petAvailable", JSON.stringify(petAvailable)); // atualiza o local storage
    sectionPets.removeChild(div)

    // if (petAvailable.length === 0) {
    //     filter.style.display = 'none'
    // }

    adopt()

}

function setup(objectElement, pet) {  // essa funcao recupera os valores cadastrados e coloca nos newInputs

    // só não consegui recuperar a foto selecionada
    const newElementRace = document.getElementById("irace")
    const newElementSize = document.getElementById("isize")
    const newElementState = document.getElementById("istate")
    const newElementCity = document.getElementById("icity")
    const newElementGender = document.querySelectorAll('input[name="gender"]')

    for (let i = 0; i < newElementSize.options.length; i++) {
        if (newElementSize.options[i].value === pet.size) {
            newElementSize.options[i].selected = true
            break;
        } 
    }

    newElementGender.forEach(radio => {
        if(radio.value === pet.gender) {
            radio.checked = true
        }
    })

    newElementRace.value = pet.race
    newElementState.value = pet.state
    newElementCity.value = pet.city

    document.body.style.overflow = 'hidden'
    buttonEdit.style.display = 'block'

    buttonEdit.addEventListener('click', function (event) {
        const newObjectElement = { 
            race: newElementRace.value, 
            size: newElementSize.value, 
            state: newElementState.value, 
            city: newElementCity.value, 
            gender: document.querySelectorAll('input[name="gender"]'),
            photo: document.getElementById("iphoto")
        }
        editCard( objectElement, pet, event, newObjectElement)
    })

    buttonSave.style.display = 'none'
    modal.showModal()

}

function verifyIfHasImageSelected (photo) {
    let isSelected = false
    // verificar se tem imagem selecionada
    if (photo && photo.files && photo.files.length > 0 ) {
        isSelected =  true
    } 
    return isSelected
}

function verifyIfHasGenderSelected (gender) {
    let isSelected = false
    // verificar se tem algum genero selecionado
    gender.forEach(radio => {
        if (radio.checked) {
            isSelected = true
        }
    })
    return isSelected
}

function editCard(objectElement, pet, event, newObjectElement) {

    if(newObjectElement.race.length >= 3 && newObjectElement.state.length >= 3 && newObjectElement.city.length >= 3 && verifyIfHasImageSelected(newObjectElement.photo) && verifyIfHasGenderSelected(newObjectElement.gender)) {
        event.preventDefault()

        newObjectElement.gender.forEach(radio => {
            if (radio.checked) {
                genderSelected = radio.value
            }
        })

        newObjectElement.photo = document.getElementById("iphoto").files[0]

        const reader = new FileReader(); 

        reader.onload = function(event) { 
            const photoURL = event.target.result; 
            const isEquals = checkSamePet (newObjectElement.race, newObjectElement.size, newObjectElement.state, newObjectElement.city, photoURL, genderSelected) 
            
            if (!isEquals) { // nao existe nenhum igual
                newObjectElement.gender.forEach(radio => {
                    if (radio.checked) {
                        objectElement.spanGender.innerHTML = radio.value
                        objectElement.spanGender.value = radio.value
                        pet.gender = radio.value
                    }
                })

                objectElement.imgImage.src = photoURL
                pet.photo = photoURL
                localStorage.setItem("petAvailable", JSON.stringify(petAvailable))

                modal.close()
                document.body.style.overflow = ''
                buttonEdit.style.display = 'none'
                buttonSave.style.display = 'block'
        
                // achar o index do pet escolhido para editar. Precisa estar aqui pois ja nas linhas seguintes, alteramos o valor do pet
                const index = petAvailable.findIndex(petIndex => {
                    return petIndex.race ===  pet.race && petIndex.gender === pet.gender && petIndex.size === pet.size &&
                    petIndex.state === pet.state && petIndex.city === pet.city && petIndex.photo === pet.photo
                })

                objectElement.spanRace.innerHTML = newObjectElement.race
                objectElement.spanState.innerHTML = newObjectElement.state
                objectElement.spanCity.innerHTML = newObjectElement.city
                objectElement.spanSize.innerHTML = newObjectElement.size
        
                objectElement.spanRace.value = newObjectElement.race
                objectElement.spanState.value = newObjectElement.state
                objectElement.spanCity.value = newObjectElement.city
                objectElement.spanSize.value = newObjectElement.size
        
                pet.race = newObjectElement.race
                pet.state = newObjectElement.state
                pet.city = newObjectElement.city
                pet.size = newObjectElement.size
        
                petAvailable[index] = pet // substituir no array e colocar o novo pet.
                
                localStorage.setItem("petAvailable", JSON.stringify(petAvailable)) /* salva o array no storage do navegador */


            } else { // existe um igual, pode ser (ele mesmo) ou outro com as mesmas informacoes
                sorry()
                modal.close()
                document.body.style.overflow = ''
                buttonEdit.style.display = 'none'
                buttonSave.style.display = 'block'
            }

        };

        reader.readAsDataURL(newObjectElement.photo); 
    }
}

window.onload = () => {
    
    if (localStorage.getItem("petAvailable")) { // verifica se tem algo salvo

        /* recuperar os pets salvos no navegador */
        const amountPet = localStorage.getItem("petAvailable")
        var arrayPet = JSON.parse(amountPet) 

        for (var i = 0; i < arrayPet.length; i++) {

            createElementsCard(arrayPet[i])
            /* enviar para o array novamente, pois ele esta vazio após recarregar */
            petAvailable.push( new Pet(arrayPet[i].race,arrayPet[i].gender,arrayPet[i].size,arrayPet[i].state,arrayPet[i].city, arrayPet[i].photo) )

        }

        // // achei redondante
        // if (petAvailable.length === 0) {
        //     filter.style.display = 'none'
        // } else {
        //     filter.style.display = 'block'
        // }
    }
    
}

let notification = document.getElementById('notification')
notification.style.position = 'relative'

function createToast(type, title, text){
    let newToast = document.createElement('div');
    newToast.style.position = 'absolute'
    newToast.style.top = '10px'
    newToast.style.right = '0px'

    newToast.innerHTML = `
        <div class="toast ${type}">

            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
        </div>`;
    notification.appendChild(newToast);
    newToast.timeOut = setTimeout(
        ()=>newToast.remove(), 5000
    )
}

function adopt() {
    let type = 'Sucesso';
    let title = 'Sucesso';
    let text = 'Pet adotado com sucesso.';
    createToast(type, title, text);
}

function sucess(){
    let type = 'Sucesso';
    let title = 'Sucesso';
    let text = 'Pet adicionado com sucesso.';
    createToast(type, title, text);
}

function error(){
    let type = 'Erro';
    let title = 'Erro';
    let text = 'Já existe um pet com as mesmas informações.';
    createToast(type, title, text);
}

function info(){
    let type = 'Info';
    let title = 'Info';
    let text = 'Nenhuma alteração feita';
    createToast(type,  title, text);
}

function sorry() {
    let type = 'Info';
    let title = 'Info';
    let text = 'Nenhuma alteração feita ou já existe algum pet com as mesmas informações';
    createToast(type,  title, text);
}

function empty() {
    let type = 'Erro';
    let title = 'Erro';
    let text = 'Para adicionar um pet, você precisa digitar as informações.';
    createToast(type,  title, text);
}

console.log('Hey Dev, não precisa ver o código por aqui, disponibilizo ele no meu perfil do GitHub, é só clicar: https://github.com/edsonaraujoneto/cadastro-de-dados-pda');

