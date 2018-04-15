import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

const sexes = [
  { key: 'a', text: 'All', value: '%'},
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
]

const species = [
  { key: 'a', text: 'All', value: '%'},
  { key: 'c', text: 'Cat', value: 'cat'},
  { key: 'd', text: 'Dog', value: 'dog'}
]

const sizes = [
  { key: 'a', text: 'All', value: '%'},
  { key: 's', text: 'Small', value: 'S'},
  { key: 'm', text: 'Medium', value: 'M'},
  { key: 'l', text: 'Large', value: 'L'}
]

const ages = [
  { key: 'a', text: 'All', value: '%'},
  { key: 'b', text: 'Baby', value: 'Baby'},
  { key: 'y', text: 'Young', value: 'Young'},
  { key: 'd', text: 'Adult', value: 'Adult'}
]

export default class FilterForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      species: "",
      sex: "",
      city: "",
      age: "",
      size: "",
      modalOpen: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.uniq = this.uniq.bind(this)

  }

    handleChange(event, result) {
      this.setState({
        [result.placeholder]: result.value
      })
    }

    handleSubmit(event) {
      event.preventDefault()
      let stateObj = this.state
      console.log(stateObj)
      for (var key in stateObj) {
        if (stateObj[key] === ""){
          delete stateObj[key]
        }
      }
      this.props.applyFilter(stateObj)
    }

    uniq(a) {
      return Array.from(new Set(a))
    }

    render(){
      let cities = this.props.shelters.map(shelter => {
        return shelter.city
      })

      let cityMenu = [ { key: 'a', text: 'All', value: '%'} ]

      this.uniq(cities).map((city, i) => {
        return cityMenu.push({ key: i, text: city, value: city })
      })


      return (
        <Modal size='fullscreen' trigger={<Button id="pref-button" size="massive"> Preferences</Button>}>
          <Modal.Header>Filter pets by:</Modal.Header>
          <Modal.Content>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Select label='Species' options={species} placeholder='species' onChange={this.handleChange} />
                <Form.Select label='Sex' options={sexes} placeholder='sex' onChange={this.handleChange} />
                <Form.Select label='City' options={cityMenu} placeholder='city' onChange={this.handleChange} />
                <Form.Select label='Size' options={sizes} placeholder='size' onChange={this.handleChange} />
                <Form.Select label='Age' options={ages} placeholder='age' onChange={this.handleChange} />
              </Form.Group>

              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }
  }
