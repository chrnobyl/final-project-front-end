import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
import '../App.css';
import NavBar from './NavBar'
import Container from './Container'
import Login from './Login'
import AuthAdapter from '../adapters/AuthAdapter'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }
    this.setUser = this.setUser.bind(this)
    this.login = this.login.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem('jwt')){
      AuthAdapter.currentUser()
        .then(user => {
          if(!user.error){
            user.jwt = localStorage.getItem('jwt')
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    } else {
      // this.redirectToLogin()
      console.log("Invalid credentials")
    }
  }

  setUser(user){
    if (user.jwt){
      this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      })
      localStorage.setItem('jwt', user.jwt)
    }
  }

  login(params){
    if(params.password_confirmation === ''){
      const loginParams = {
        "auth": {
          "email": params.email,
          "password": params.password
        }
      }
      AuthAdapter.login(loginParams)
        .then(user => {
          this.setUser(user)
        })
    } else {
      console.log("Invalid credentials")
    //   UsersAdapter.signup(params)
    //     .then(user => {
    //       this.setUser(user)
    //     })
    }
  }

  logout(){
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })
  }

  redirectToLogin(){
    this.props.history.push('/')
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
  //       <NavBar />
  //       <Container />
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

  render() {
    const { isLoggedIn, user } = this.state.auth
    return (
      <div>
        {!isLoggedIn ? <Route path="/" action={this.redirectToLogin} /> : null}
        <NavBar isLoggedIn={isLoggedIn} user={user} logout={this.logout} />
        {isLoggedIn ? <Container user={user} /> : <Login onSubmit={this.login} /> }
      </div>
    );
  }
}

export default withRouter(App)
