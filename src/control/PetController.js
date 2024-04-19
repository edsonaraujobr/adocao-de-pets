import { Pet } from '../model/Pet.js'

var petAvailable = []

export function addNewPet (race, gender, size, state, city, photo) {
    const newPet = new Pet(race, gender, size, state, city, photo);
    petAvailable.push( newPet );
    return newPet;
}

export function getPetAvailable () {
    return petAvailable;
}

export function searchPet(pet) {
    const index = petAvailable.findIndex((petObj) => {
        return petObj.race === pet.race && petObj.gender === pet.gender && petObj.size === pet.size && petObj.state === pet.state && petObj.city === pet.city && petObj.photo === pet.photo 
    });
    return index;
}
export function editPet(index, pet) {
    petAvailable[index] = pet;
}








