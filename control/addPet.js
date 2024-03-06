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
    const photo = document.getElementById("iphoto")
    const gender = document.getElementsByName("gender")
    if(race.value != '' && size.value != '' && state.value != '' && city.value != '' && gender.value != '' && photo.value != '') {
        e.preventDefault()
        modal.close()
    }   
})