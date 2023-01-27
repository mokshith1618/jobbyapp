import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({
        showSubmitError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    console.log('j')
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div>
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              value={username}
              type="text"
              placeholder="Username"
              onChange={this.changeUsername}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          <button type="submit">Login</button>
          {showSubmitError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
