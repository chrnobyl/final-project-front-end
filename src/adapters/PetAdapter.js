const dbUrl = 'https://wag-api.herokuapp.com/api/v1/'
const apiUrl = `http://api.petfinder.com/pet.find?key=${process.env.REACT_APP_API_KEY}&animal=dog&location=NY&count=200&output=basic&format=json`

export default class PetAdapter  {
  static all(){
    return fetch(apiUrl)
      .then( res => res.json() )
  }

  static allUserPets(){
    return fetch(`${dbUrl}/users/1/user_pets`)
    .then( res => res.json())
  }

  static allShelters(){
    return fetch(`${dbUrl}/shelters`)
    .then( res => res.json())
  }

  // static createPet(){
  //   return fetch(`${this.url()}`, {
  //     method: 'POST',
  //     headers: this.headers(),
  //     body: JSON.stringify({
  //       pet: {
  //         name: pet.name.value,
  //         species: pet.species.value,
  //         age: pet.age.value,
  //         weight: pet.weight.value,
  //         color: pet.color.value,
  //         sex: pet.sex.value,
  //         shelter_id: pet.shelter_id.value
  //
  //       }
  //     })
  //   }).then(response => response.json() )
  //   // .then(window.location.href = "http://localhost:3001/pets")
  // }

  static getFilteredPets(pets){
    let query = JSON.stringify(pets)
    return fetch(`${apiUrl}`, {
      method: 'POST',
      headers: this.headers(),
      body: query
    // .then(window.location.href = "http://localhost:3001/foods")
    }).then(res => res.json() )
  }


  static createUserPet(pet_id){
    return fetch(`${dbUrl}/users/1/user_pets`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        user_pet: {
          user_id: 1,
          pet_id: pet_id
        }
      })
    }).then(res => res.json() )
  }

  static destroyUserPet(id){
    return fetch(`${dbUrl}/users/1/user_pets/${id}`, {
      method: 'DELETE'
    }).then(res => res.json() )
  }

  static headers(){
    return {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }

  static url(){
    return `${dbUrl}/pets`
  }

}
