import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Filters from '../Filters'
import JobItem from '../JobItem'

import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const convertSnakeCaseToCamelCase = jobs => {
  const updatedData = jobs.map(eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,
    packagePerAnnum: eachItem.package_per_annum,
    rating: eachItem.rating,
    title: eachItem.title,
  }))
  return updatedData
}

class Jobs extends Component {
  state = {
    activeEmploymentTypesList: [],
    activeSalaryRange: '',
    searchTitle: '',
    profileStatus: apiStatus.initial,
    jobsStatus: apiStatus.initial,
    profileDetails: [],
    jobs: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      jobsStatus: apiStatus.inProgress,
    })
    const {
      searchTitle,
      activeEmploymentTypesList,
      activeSalaryRange,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypesList.join(
      ',',
    )}&minimum_package=${activeSalaryRange}&search=${searchTitle}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobs = convertSnakeCaseToCamelCase(data.jobs)
      this.setState({
        jobsStatus: apiStatus.success,
        jobs,
      })
    } else {
      this.setState({
        jobsStatus: apiStatus.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({
      profileStatus: apiStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileStatus: apiStatus.success,
        profileDetails,
      })
    } else {
      this.setState({
        profileStatus: apiStatus.failure,
      })
    }
  }

  changeEmploymentType = employmentType => {
    this.setState(prevState => {
      if (prevState.activeEmploymentTypesList.includes(employmentType)) {
        return {
          activeEmploymentTypesList: prevState.activeEmploymentTypesList.filter(
            eachItem => eachItem !== employmentType,
          ),
        }
      }
      return {
        activeEmploymentTypesList: [
          ...prevState.activeEmploymentTypesList,
          employmentType,
        ],
      }
    }, this.getJobs)
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState(
      {
        activeSalaryRange,
      },
      this.getJobs,
    )
  }

  changeSearchTitle = event => {
    this.setState({searchTitle: event.target.value})
  }

  renderJobsList = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul>
        {jobs.map(eachItem => (
          <JobItem jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case apiStatus.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </div>
        )
      case apiStatus.success:
        return this.renderJobsList()
      case apiStatus.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button type="button" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderProfile = () => {
    const {profileStatus, profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    switch (profileStatus) {
      case apiStatus.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </div>
        )
      case apiStatus.success:
        return (
          <div>
            <img src={profileImageUrl} alt="profile" />
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        )
      case apiStatus.failure:
        return (
          <div>
            <button type="button" onClick={this.getProfile}>
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {activeSalaryRange, searchTitle} = this.state
    return (
      <div>
        <Header />
        <div className="bg">
          <div>
            {this.renderProfile()}
            <Filters
              activeSalaryRange={activeSalaryRange}
              changeSalaryRange={this.changeSalaryRange}
              changeEmploymentType={this.changeEmploymentType}
            />
          </div>
          <div>
            <div>
              <input
                type="search"
                placeholder="search"
                value={searchTitle}
                onChange={this.changeSearchTitle}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getJobs}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
