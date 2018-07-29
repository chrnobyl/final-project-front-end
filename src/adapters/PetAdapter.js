// const dbUrl = 'https://wag-api.herokuapp.com/api/v1/'
const dbUrl = 'http://localhost:3000/api/v1'
const apiUrl = `http://api.petfinder.com/pet.find?key=${apiKey}&animal=dog&location=NY&count=200&output=basic&format=json`
const apiKey = process.env.REACT_APP_API_KEY
const apiSecret = process.env.REACT_APP_API_SECRET

export default class PetAdapter {
  static all() {
    console.log(apiUrl)
    console.log(apiKey)
    console.log(apiSecret)
    return fetch(apiUrl)
      .then(res => res.json())
  }

  static allUserPets(user) {
    return fetch(`${dbUrl}/users/${user.id}/user_pets`)
    .then(res => res.json())
  }

  static allShelters() {
    return fetch(`${dbUrl}/shelters`)
    .then(res => res.json())
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

  static getFilteredPets(pets) {
    let query = JSON.stringify(pets)
    return fetch(`${apiUrl}`, {
      method: 'POST',
      headers: this.headers(),
      body: query
    // .then(window.location.href = "http://localhost:3001/foods")
    }).then(res => res.json())
  }

  static createUserPet(pet_id) {
    return fetch(`${dbUrl}/users/1/user_pets`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        user_pet: {
          user_id: 1,
          pet_id: pet_id
        }
      })
    }).then(res => res.json())
  }

  static destroyUserPet(id) {
    return fetch(`${dbUrl}/users/1/user_pets/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }

  static headers() {
    return {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }

  static url() {
    return `${dbUrl}/pets`
  }
}
