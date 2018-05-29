const dbUrl = 'http://localhost:3000/api/v1'
const headers = () => ({
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
})

export default class AuthAdapter {
  static login(params) {
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    // const request = {
    //   "auth": {
    //     "email": email,
    //     "password": password
    //   }
    // }
    console.log(params)
    fetch({
      url: `${dbUrl}/user_token`,
      type: "POST",
      data: params,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
  }

  static currentUser(){
    return fetch(`${dbUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}
