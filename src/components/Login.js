import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import '../App.css';
// import NavBar from './NavBar'
// import Container from './Container'

export default class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      password_confirmation: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      username: '',
      password: ''
    })
  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /><br/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </Form.Field>
        <Route path="/signup" render={() => {
          return (
            <Form.Field>
              <label>Password Confirmation</label>
              <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
            </Form.Field>
          )
        }}/>
        <Button type="submit">
          <Route path="/signup" render={() => <div>Sign Up</div>}/>
          <Route path="/login" render={() => <div>Login</div>} />
        </Button>
      </Form>
    )
  }
  // login() {
  //   const email = document.getElementById("email")
  //   const password = document.getElementById("password")
  //   const request = {"auth": {"email": email, "password": password}}
  //   console.log(request)
  //   fetch({
  //     url: "http://localhost:3000/api/user_token",
  //     type: "POST",
  //     data: request,
  //     dataType: "json",
  //     success: function (result) {
  //       console.log(result)
  //       localStorage.setItem("jwt", result.jwt)
  //     }
  //   })
  // }
  //
  // render() {
  //
  //   return (
  //     <div className="container-fluid">
  //       <form>
  //         <label htmlFor="email">Email: </label>
  //         <br />
  //         <input
  //           name="email"
  //           id="email"
  //           type="email"
  //           ref={ref => this.myTextInput = ref}
  //         />
  //         <br /><br />
  //         <label htmlFor="password">Password:</label>
  //         <br />
  //         <input
  //           name="password"
  //           id="password"
  //           type="password"
  //           ref={ref => this.myTextInput = ref}
  //         />
  //         </form>
  //         <br />
  //         <button
  //           onClick={this.login}
  //         >
  //             Login
  //         </button>
  //     </div>
  //   )
  // }
}
