import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookie.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <div className="header">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
          <li>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
