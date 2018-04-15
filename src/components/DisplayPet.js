import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
// import PetDetail from './PetDetail'

const DisplayPet = (props) => {

  function returnPet(props) {

    if (props.pet === undefined) {
      return (
        <div>
          <h3>No pets found. Update your filter settings to see more pets.</h3>
          <Image src="https://wbo2hhkgdnexdedu-zippykid.netdna-ssl.com/wp-content/uploads/2014/04/duck-hunt.gif" size="huge"/>
        </div>
      )
    } else if (props.detail === true){
      return (
        <Card fluid centered raised color="red">
          <Image src={props.pet.media.photos.photo[2].$t} fluid />
          <Card.Content>
            <Card.Header size="massive" color="green">
              <h1>{props.pet.name.$t}</h1>
            </Card.Header>
            <Card.Meta>
              <span className="age"><h2>
                Age: {props.pet.age.$t}
              </h2></span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a href={`mailto:${props.pet.contact.email.$t}`}>
              <h2><Icon name="home" size="big"/>
              {props.pet.shelterId.$t}</h2>
            </a>
            <div>
              <Button.Group>
                <Button size="massive" secondary onClick={props.noPet}>Skip</Button>
                <Button size="massive" color="purple" onClick={props.showDetail}>Bio</Button>
                <Button
                  size="massive"
                  color="green"
                  content="Adopt"
                  icon="heart" onClick={props.yesPet}
                />
              </Button.Group>
          </div>
          </Card.Content>
          <Card.Content extra>
            <h2><p>{props.pet.description.$t}</p></h2>
          </Card.Content>
        </Card>
      )
    } else {
      return (
        <Card fluid centered raised>
          <Image src={props.pet.media.photos.photo[2].$t} fluid />
          <Card.Content>
            <Card.Header size="massive">
              <h1>{props.pet.name.$t}</h1>
            </Card.Header>
            <Card.Meta>
              <span className="age"><h2>
                Age: {props.pet.age.$t}
              </h2></span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <h2><Icon name="home" size="big"/>
              {props.pet.shelterId.$t}</h2>
            </a>
            <div>
              <Button.Group>
                <Button size="massive" secondary onClick={props.noPet}>Skip</Button>
                <Button size="massive" color="purple" onClick={props.showDetail}>Bio</Button>
                <Button
                  size="massive"
                  color="green"
                  content="Adopt"
                  icon="heart" onClick={props.yesPet}
                />
              </Button.Group>

          </div>
          </Card.Content>
        </Card>
      )
    }
  }

  return (
    <div className="center">
      {returnPet(props)}
    </div>
  )
}

export default DisplayPet
