import React, { Component } from 'react'
import PetAdapter from '../adapters/PetAdapter'
import Pet from './Pet'

export default function UserPets(props) {
  if (props.pets.length >= 1) {
  return (

    <div className="right">
      <h1>Your pets:</h1>
        <ul>
          {props.pets.map((pet, i) => {
            return (
              <li key={i}><Pet key={i} id={pet.id} name={pet.name} age={pet.age} picture={pet.picture}/>{pet.id}</li>
            )
          })}
      </ul>
    </div>
  )
  } else {
    return (
      <h3>loading pets...</h3>
    )
  }
}

  // constructor(){
  //   super()
  //   this.state = {
  //     userPets: []
  //   }
  //   this.listUserPets = this.listUserPets.bind(this)
  // }

  // componentDidMount(){
  //   PetAdapter.allUserPets()
  //   .then(data => {
  //     this.setState({ userPets: data })
  //   })
  // }
  //
  // listUserPets(){
  //   return this.state.userPets.map((userPet) => {
  //     return this.props.pets.map((pet, i) => {
  //       if (userPet.pet_id === pet.id) {
  //         return (
  //           <Pet key={i} id={pet.id} name={pet.name} age={pet.age} picture={pet.picture}/>
  //         )
  //       }
  //     })
  //   })
  // }


  //
  // render(){
//     return (
//       <div>
//         <h1>Your pets:</h1>
//         {this.props.pets.map((pet) => {
//           pet.name
//         })}
//       </div>
//     )
//   }
// }
