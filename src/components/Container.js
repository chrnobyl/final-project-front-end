import React, { Component } from 'react'
import PetAdapter from '../adapters/PetAdapter'
import UserPets from './UserPets'
import DisplayPet from './DisplayPet'
import FilterForm from './FilterForm'
import PetDetail from './PetDetail'
import { Popup } from 'semantic-ui-react'

let message

export default class Container extends Component {
  constructor(){
    super()
    this.state = {
      petNum: 1,
      pets: [],
      userPets: [],
      userPetIds: [],
      shelters: [],
      detail: false,
      modal: false,
      form: []
    }

    this.yesPet = this.yesPet.bind(this)
    this.noPet = this.noPet.bind(this)
    this.showDetail = this.showDetail.bind(this)
    this.showModal = this.showModal.bind(this)
    this.deleteUserPet = this.deleteUserPet.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount(){
    PetAdapter.all()
    .then(data => {
      this.setState(prevState => ({
        petNum: data.petfinder.pets.pet[0].id.$t,
        pets: data.petfinder.pets.pet
      }))
    })
    PetAdapter.allUserPets()
    .then(data => {
      this.setState({
        userPets: data.filter((d, i) => data.indexOf(d) === i),
        userPetIds: data.map(d => d.id)
      })
    })
    PetAdapter.allShelters()
    .then(data => {
      this.setState({
        shelters: data
      })
    })
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  yesPet(){
    let newPetArray = this.state.pets
    newPetArray.shift()
    if (this.state.userPetIds.includes(this.state.petNum)){
      message = "You already added that pet."
      if (newPetArray.length > 1) {
        this.setState((prevState) => ({
          pets: newPetArray,
          petNum: this.state.pets[0].id
        }))
      } else if (newPetArray.length <= 1) {
        this.setState((prevState) => ({
          pets: newPetArray,
        }))
      }
    } else {
      message = "Pet added!"
      if (newPetArray.length > 1) {
        PetAdapter.createUserPet(this.state.petNum)
        .then(res => {
          this.setState((prevState) => ({
            pets: newPetArray,
            petNum: this.state.pets[0].id,
            userPets: [...prevState.userPets, res].filter(pet => pet.id !== newPetArray[0].id),
            userPetIds: [...prevState.userPetIds, res.pet_id]
          }))
        })
      } else if (newPetArray.length === 1) {
        PetAdapter.createUserPet(this.state.petNum)
        .then(res => {
          this.setState((prevState) => ({
            pets: newPetArray,
            petNum: 0,
            userPets: [...prevState.userPets, res].filter(pet => pet.id !== newPetArray[0].id),
            userPetIds: [...prevState.userPetIds, res.pet_id]
          }))
        })
      }
    }
  }

  noPet(){
    message = ""
    console.log("no")
    let newPetArray = this.state.pets
    newPetArray.shift()
    if (newPetArray.length > 1) {
      this.setState((prevState) => ({
        pets: newPetArray,
        petNum: this.state.pets[0].id
      }))
    } else if (newPetArray.length <= 1) {
      this.setState((prevState) => ({
        pets: newPetArray
      }))
    }
  }

  showDetail(){
    console.log("detail")
    this.setState({
      detail: !this.state.detail
    })
  }

  showModal(){
    console.log("modal")
    this.setState({
      modal: !this.state.modal
    })
  }

  deleteUserPet(id){
    PetAdapter.destroyUserPet(id)
    .then( () => {
      this.setState(prevState => {
        return {
          userPets: prevState.userPets.filter(pet => pet.id !== id),
          userPetIds: prevState.userPetIds.filter(num => num !== id)
        }
      })
      console.log(this.state.userPets)
    })
  }

  handleKeyDown(event){
    event.preventDefault()
    console.log(this.state.petNum)
    if(event.keyCode === 39){
      return this.yesPet()
    } else if (event.keyCode === 37){
      return this.noPet()
    } else if (event.keyCode === 40){
      return this.showDetail()
    } else if (event.keyCode === 38){
      return this.showModal()
    }
  }

  applyFilter(filter){
    PetAdapter.getFilteredPets(filter)
    .then(data => {
      if (data[0] !== undefined){
        this.setState({
          petNum: data[0].id,
          pets: data
        })
      }
    })
  }

  render(){
    return (
      <div>
        <div className="center">
          <DisplayPet pet={this.state.pets[0]} petNum={this.state.petNum} yesPet={this.yesPet} noPet={this.noPet} showDetail={this.showDetail} detail={this.state.detail} shelters={this.state.shelters}/>
          <FilterForm show={this.state.modal} onClose={this.showModal} pets={this.state.pets} shelters={this.state.shelters} applyFilter={this.applyFilter}/>
        </div>

        <UserPets pets={this.state.userPets} deleteUserPet={this.deleteUserPet} />

        <div className="message"><h1>{message}</h1></div>
        <div className="instructions"><h1>Use the arrow keys! Press right to adopt, left to skip, or down to see bio.</h1></div>
        <div id="cat"><Popup
    trigger={<img src="http://www.hillspet.com/HillsPetUS/v1/portal/en/us/science-diet/youthful-vitality/locale-assets/img/pet-foods/bottom-banner-cat.png" />}
    content='meow.'
    on='hover'
  /></div>


      </div>
    )
  }
}
