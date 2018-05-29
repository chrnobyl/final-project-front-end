import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar'
import Container from './Container'

export default class App extends Component {

  login() {
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const request = {"auth": {"email": email, "password": password}}
    console.log(request)
    fetch({
      url: "http://localhost:3000/api/user_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
  }

  render() {

    return (
      <div className="container-fluid">
        <NavBar />
        <Container />
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="email"
            type="email"
            ref={ref => this.myTextInput = ref}
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
            ref={ref => this.myTextInput = ref}
          />
          </form>
          <br />
          <button
            onClick={this.login}
          >
              Login
          </button>
      </div>
    )
  }
}
